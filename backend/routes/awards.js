const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addAward,
  updateAward,
  deleteAward,
  getAwards,
  getAwardById,
} = require("../controllers/awards");

// @route   POST /api/awards
// @desc    Create new award
// @access  Private (admin)
router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addAward,
);

// @route   PUT /api/awards/:id
// @desc    Update existing award
// @access  Private (admin)
router.put(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  updateAward,
);

// @route   DELETE /api/awards/:id
// @desc    Delete existing award
// @access  Private (admin)
router.delete(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  deleteAward,
);

// @route   GET /api/awards
// @desc    GET existing awards
// @access  Public
router.get("/", getAwards);

// @route   GET /api/awards/:id
// @desc    GET existing award by id
// @access  Public
router.get("/:id", getAwardById);

module.exports = router;
