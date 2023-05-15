const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  // 게시물 작성
  createPost = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const { content, createdAt, updatedAt } = req.body;
      const img_urls = req.img_url;
      console.log(img_urls);

      if (!content) {
        return res
          .status(412)
          .json({ errorMessage: '게시글 내용을 입력해주세요.' });
      }

      // content만 입력할 경우
      if (img_urls === undefined) {
        const createPostData = await this.postService.createPost(
          user_id,
          content,
          createdAt,
          updatedAt
        );
        console.log(createPostData);
      };

      // 이미지 파일을 함께 업로드 할 경우
      if (img_urls !== undefined) {
        const createPostImageData = await this.postService.createPostImage(
          user_id,
          content,
          img_urls,
          createdAt,
          updatedAt
        );
        console.log(createPostImageData);
      }

      return res.status(200).json({ message: "게시물 작성에 성공했습니다." });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  };

  // 피드, 게시글 전체 조회
  findAllPost = async (req, res) => {
    try {
      const findAllPost = await this.postService.findAllPost();
      const findAllImg = await this.postService.findAllImg();
      return res.status(200).json({ findAllPost, findAllImg });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        errorMessage: '게시글 조회에 실패하였습니다.',
      });
    }
  };
}

module.exports = PostsController;
