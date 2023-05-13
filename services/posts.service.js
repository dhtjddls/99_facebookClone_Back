const PostRepository = require("../repositories/posts.repositories")

class PostService {
    PostRepository = new PostRepository

    createPost = async (
        userId, nickname, title, content, createdAt, updatedAt
      ) => {
        const createPostData = await this.postRepository.createPost(
          userId,
          nickname,
          title,
          content,
          createdAt,
          updatedAt
        );
    
        return {
          postId: createPostData.postId,
          nickname: createPostData.nickname,
          title: createPostData.title,
          content: createPostData.content,
          createdAt: createPostData.createdAt,
          updatedAt: createPostData.updatedAt,
        };
      };
}

module.exports = PostService