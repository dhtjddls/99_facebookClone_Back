const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controllers");
const uploadImage = require("../middlewares/multer-s3");
const postsController = new PostsController();
// const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", uploadImage.single("img"), postsController.createPost); // 게시물 작성
// router.get("/:post_id", postsController.getPostById); // 게시물 상세조회
// router.put("/:post_id", postsController.updatePost); // 게시물 수정
// router.delete("/:post_id", postsController.deletePost); // 게시물 삭제

module.exports = router;
