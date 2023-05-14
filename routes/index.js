const express = require('express');
const router = express.Router();
const authRouter = require('./auth.routes');
const postRouter = require('./post.routes');
const followRouter = require('./follow.routes');
// 양식
router.use('/auth', [authRouter]);
router.use('/post', [postRouter]);
router.use('/follow', [followRouter]);

module.exports = router;
