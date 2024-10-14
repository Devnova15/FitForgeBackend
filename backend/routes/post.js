const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPostsFilterParams,
} = require("../controllers/post");

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), createPost);

// @route   PUT api/posts/:id
// @desc    Update post
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updatePost,
);

// @route   DELETE api/posts/:id
// @desc    DELETE existing post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost,
);

// @route   GET api/posts
// @desc    GET appropriate filtered posts
// @access  Public
router.get("/", getPostsFilterParams);

// @route   GET api/posts/:id
// @desc    GET existing post
// @access  Public
router.get("/:id", getPostById);

module.exports = router;
