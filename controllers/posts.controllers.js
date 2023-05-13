const PostService = require("../services/posts.service");

class PostsController {
    postService = new PostService();

    // 게시물 작성
    createPost = async (req, res, next) => {
        const { title, content, createdAt, updatedAt } = req.body;
        const { userId, nickname } = res.locals.user;
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

module.exports = PostsController