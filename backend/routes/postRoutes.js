// JavaScript
const express = require('express');
const router = express.Router();
const { createPost } = require('../controllers/post');
const { upload } = require('../middleware/uploadMiddleware');

// POST /api/posts
router.post('/', upload.array('images', 5), createPost);

module.exports = router;