const Post = require("../models/Post");
const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

// controllers/post.js
exports.createPost = async (req, res) => {
  try {
    // Получаем загруженные файлы из S3
    const files = req.files;
    const imageUrls = files ? files.map((file) => file.location) : [];

    console.log("Загруженные изображения:", imageUrls);
    console.log("Контент:", req.body.content);
    console.log("Пользователь:", req.user);

    // Создаем пост с правильными полями согласно модели
    const postData = {
      user: req.user.id, // поле user (не author)
      content: req.body.content,
      imageUrls: imageUrls, // поле imageUrls (не images)
      enabled: true,
      likes: [], // массив строк, не число
      date: new Date() // поле date (не createdAt)
    };

    // Сохраняем в MongoDB
    const newPost = new Post(postData);
    await newPost.save();

    // Получаем созданный пост с populate
    const populatedPost = await Post.findById(newPost._id)
      .populate("user", "firstName lastName email avatarUrl");

    res.status(201).json({
      message: "Пост создан успешно",
      post: populatedPost
    });
    
  } catch (error) {
    console.error("Ошибка создания поста:", error);
    res.status(500).json({
      error: "Ошибка при создании поста",
      details: error.message,
    });
  }
};

// Остальные методы остаются без изменений...
exports.updatePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          message: `Post with id "${req.params.id}" is not found.`,
        });
      }

      if (!(req.user.isAdmin || req.user.id === post.user)) {
        return res.status(403).json({
          message: `You don't have permission to perform this action.`,
        });
      }

      const postData = _.cloneDeep(req.body);
      const updatedPost = queryCreator(postData);

      Post.findOneAndUpdate(
        { user: req.user.id, _id: req.params.id },
        { $set: updatedPost },
        { new: true },
      )
        .populate("user", "firstName lastName email avatarUrl")
        .then((post) => res.json(post))
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          }),
        );
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.updatePostLikes = (req, res, next) => {
  req.user.id;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          message: `Post with id "${req.params.id}" is not found.`,
        });
      }

      const likes = post.likes || [];
      const likeIndex = likes.indexOf(req.user.id);
      if (likeIndex > -1) {
        likes.splice(likeIndex, 1);
      } else {
        likes.push(req.user.id);
      }
      const updatedPost = queryCreator({ likes });

      Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedPost },
        { new: true },
      )
        .populate("user", "firstName lastName email avatarUrl")
        .then((post) => res.json(post))
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          }),
        );
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      return res.status(404).json({
        message: `Post with id "${req.params.id}" is not found.`,
      });
    }

    if (!(req.user.isAdmin || req.user.id === post.user)) {
      return res.status(403).json({
        message: `You don't have permission to perform this action.`,
      });
    }

    Post.deleteOne({ _id: req.params.id })
      .then((deletedCount) =>
        res.status(200).json({
          message: `Post is successfully deleted from DB`,
        }),
      )
      .catch((err) =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `,
        }),
      );
  });
};

exports.getPostById = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .populate("user", "firstName lastName email avatarUrl")
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          message: `Post with id "${req.params.id}" is not found.`,
        });
      } else {
        res.json(post);
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.getPostsFilterParams = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const perPage = Number(req.query.perPage) || 10;
  const startPage = Number(req.query.startPage) || 1;
  const sort = req.query.sort || "date";

  try {
    const posts = await Post.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort)
      .populate("user", "firstName lastName email avatarUrl");

    const postsQuantity = await Post.find(mongooseQuery);

    res.json({ posts, postsQuantity: postsQuantity.length });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};