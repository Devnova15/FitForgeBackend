const Post = require("../models/Post");
const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

exports.createPost = (req, res, next) => {
  const postData = _.cloneDeep(req.body);
  postData.user = req.user.id;

  const newPost = new Post(queryCreator(postData));

  newPost.populate("user", "firstName lastName email avatarUrl").execPopulate();

  newPost
    .save()
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

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
  const sort = req.query.sort || 'date';

  try {
    const posts = await Post.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const postsQuantity = await Post.find(mongooseQuery);

    res.json({ posts, postsQuantity: postsQuantity.length });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};
