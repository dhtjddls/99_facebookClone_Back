const PostRepository = require('../repositories/posts.repositories');
const { sequelize } = require('../models');
const { Transaction } = require('sequelize');

class PostService {
  postRepository = new PostRepository();

  createPost = async (userId, content, createdAt, updatedAt) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      content,
      createdAt,
      updatedAt
    );

    return {
      postId: createPostData.post_id,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  createPostImage = async (userId, img_url, content, createdAt, updatedAt) => {
    const result = await sequelize.transaction(
      { isolateLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        const createPostData = await this.postRepository.createPost(
          userId,
          content,
          createdAt,
          updatedAt,
          { transaction: t }
        );

        const createImageData = await this.postRepository.createImage(
          img_url,
          createdAt,
          updatedAt,
          { transaction: t }
        );

        return {
          postId: createPostData.postId,
          img_url: createImageData.content,
          content: createPostData.content,
          createdAt: createPostData.createdAt,
          updatedAt: createPostData.updatedAt,
        };
      }
    );

    return result;
  };
}

module.exports = PostService;
