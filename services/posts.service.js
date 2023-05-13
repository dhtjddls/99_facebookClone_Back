const PostRepository = require("../repositories/posts.repositories")

class PostService {
  PostRepository = new PostRepository

  createPost = async (
    userId, content, createdAt, updatedAt
  ) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      content,
      createdAt,
      updatedAt
    );

    return {
      postId: createPostData.postId,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  createImage = async (
    img_url, createdAt, updatedAt
  ) => {
    const createImageData = await this.postRepository.createImage(
      img_url,
      createdAt,
      updatedAt
    );

    return {
      img_url: createImageData.content,
      createdAt: createImageData.createdAt,
      updatedAt: createImageData.updatedAt,
    };
  };
}

module.exports = PostService