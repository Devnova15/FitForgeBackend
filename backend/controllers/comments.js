const Comment = require("../models/Comment");
const Post = require("../models/Post");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

exports.addComment = (req, res, next) => {
  const commentData = _.cloneDeep(req.body);
  commentData.user = req.user.id;
  const newComment = new Comment(queryCreator(commentData));

  newComment
    .populate("user", "firstName lastName email avatarUrl")
    .execPopulate();

  newComment
    .save()
    .then((comment) => res.json(comment))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.updateComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({
          message: `Comment with id "${req.params.id}" is not found.`,
        });
      }

      if (!(req.user.isAdmin || req.user.id === comment.userId)) {
        return res.status(403).json({
          message: `You don't have permission to perform this action.`,
        });
      }

      const commentData = _.cloneDeep(req.body);
      const updatedComment = queryCreator(commentData);

      Comment.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedComment },
        { new: true },
      )
        .populate("user", "firstName lastName email avatarUrl")
        .then((comment) => res.json(comment))
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

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id }).then(async (comment) => {
    if (!comment) {
      return res.status(404).json({
        message: `Comment with id "${req.params.id}" is not found.`,
      });
    }

    if (!(req.user.isAdmin || req.user.id === comment.userId)) {
      return res.status(403).json({
        message: `You don't have permission to perform this action.`,
      });
    }

    Comment.deleteOne({ _id: req.params.id })
      .then((deletedCount) =>
        res.status(200).json({
          message: `Comment is successfully deletes from DB.`,
        }),
      )
      .catch((err) =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `,
        }),
      );
  });
};

exports.getAllComments = (req, res, next) => {
  Comment.find()
    .populate("user", "firstName lastName email avatarUrl")
    .then((comments) => res.status(200).json(comments))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.getUserComments = (req, res, next) => {
  Comment.find({ user: req.params.userId })
    .populate("user", "firstName lastName email avatarUrl")
    .then((comments) => res.status(200).json(comments))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.getPostComments = (req, res, next) => {
  Comment.find({ post: req.params.postId })
    .populate("user", "firstName lastName email avatarUrl")
    .then((comments) => res.status(200).json(comments))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};
