const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  createUser,
  loginUser,
  getUserById,
  editUserInfo,
  updatePassword,
  addAwardToUser,
  deleteAwardFromUser,
} = require("../controllers/users");

// @route   POST /api/users
// @desc    Register user
// @access  Public
router.post("/", createUser);

// @route   POST /api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post("/login", loginUser);

// @route   PUT /api/users
// @desc    Return current user
// @access  Private
router.put("/", passport.authenticate("jwt", { session: false }), editUserInfo);

// @route   POST /api/users/update-password
// @desc    Return current user and success or error message
// @access  Private
router.put(
  "/update-password",
  passport.authenticate("jwt", { session: false }),
  updatePassword,
);

// @route   GET /api/users/:id
// @desc    GET existing user
// @access  Public
router.get("/:id", getUserById);

// @route   PUT /api/users/awards/:awardId
// @desc    Add award to user
// @access  Private
router.put(
  "/awards/:awardId",
  passport.authenticate("jwt", { session: false }),
  addAwardToUser,
);

// @route   DELETE /api/users/awards/:awardId
// @desc    Delete award from user
// @access  Private
router.delete(
  "/awards/:awardId",
  passport.authenticate("jwt", { session: false }),
  deleteAwardFromUser,
);

module.exports = router;
