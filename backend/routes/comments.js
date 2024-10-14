const express = require("express");
const router = express.Router();
const passport = require("passport"); // multer for parsing multipart form data (files)

//Import controllers
const {
  addComment,
  updateComment,
  deleteComment,
  getAllComments,
  getUserComments,
  getPostComments
} = require("../controllers/comments");

// @route   POST api/comments
// @desc    Add new comments
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), addComment);

// @route   PUT api/comments/:id
// @desc    Update existing comment
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }), updateComment,
);

// @route   DELETE api/comments/:id
// @desc    Delete existing comment
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }), deleteComment
);

// @route   GET api/comments
// @desc    GET existing comments
// @access  Public
router.get("/", getAllComments);

// @route   GET api/comments/user/:userId
// @desc    GET existing comments of particular user
// @access  Public
router.get("/user/:userId", getUserComments);

// @route   GET api/comments/post/:postId
// @desc    GET existing comments of particular product
// @access  Public
router.get("/post/:postId", getPostComments);

module.exports = router;
