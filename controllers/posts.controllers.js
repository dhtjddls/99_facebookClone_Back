const PostService = require("../services/posts.service");

class PostsController {
  postService = new PostService();

  // 게시물 작성
  createPost = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { content, createdAt, updatedAt } = req.body;
      const { img_url } = req;
      console.log(img_url);

      // img_url을 imgaes table에 저장해주세요!
      const createPostData = await this.postService.createPost(
        user_id,
        content,
        createdAt,
        updatedAt
      );

      const createImageData = await this.postService.createImage(
        img_url,
        createdAt,
        updatedAt
      );
      
      console.log(createPostData, createImageData);
      return res.status(200).json({ message: "게시물 작성에 성공했습니다." });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "요청한 데이터 형식이 올바르지 않습니다." });
    };
  };
}

module.exports = PostsController;
