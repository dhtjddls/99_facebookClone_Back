const { request } = require("express");
const PostService = require("../services/posts.service");

class PostsController {
  postService = new PostService();

  // 게시물 작성
  createPost = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { content, createdAt, updatedAt } = req.body;
      const  img_url = req.img_url;


      if (!content) {
        return res.status(412).json({ errorMessage: "게시글 내용을 입력해주세요." });
      };

      // content만 업로드 할 경우
      if (img_url === undefined) {
        const createPostData = await this.postService.createPost(
          user_id,
          content,
          createdAt,
          updatedAt
        );
        console.log(createPostData);
      };

      // 이미지 파일을 업로드 할 경우
      if (img_url !== undefined) {
        const createPostImageData = await this.postService.createPostImage(
          user_id,
          content,
          img_url,
          createdAt,
          updatedAt
        );
        console.log(createPostImageData);
      };

      return res.status(200).json({ message: "게시물 작성에 성공했습니다." });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "요청한 데이터 형식이 올바르지 않습니다." });
    };
  };
}

module.exports = PostsController;
