const PostService = require("../services/posts.service");

class PostsController {
  postService = new PostService();

  // 게시물 작성
  createPost = async (req, res, next) => {
    const { title, content, createdAt, updatedAt } = req.body;
    const { img_url } = req;
    console.log(img_url);
    const { userId, nickname } = res.locals.user;
    // img_url을 imgaes table에 저장해주세요!
    const createPostData = await this.postService.createPost(
      userId,
      nickname,
      title,
      content,
      createdAt,
      updatedAt
    );

    res.status(201).json({ data: createPostData });
  };
}

module.exports = PostsController;
