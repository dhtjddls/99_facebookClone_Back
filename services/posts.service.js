const PostRepository = require("../repositories/posts.repositories")
const { sequelize } = require("../models");
const { Transaction } = require("sequelize");

class PostService {
  postRepository = new PostRepository();

  createPost = async (
    user_id, content, createdAt, updatedAt
  ) => {
    const createPostData = await this.postRepository.createPost(
      user_id,
      content,
      createdAt,
      updatedAt
    );

    return {
      post_id: createPostData.post_id,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  createPostImage = async (
    user_id,
    content, 
    img_url, 
    createdAt, 
    updatedAt
  ) => {
    const result = await sequelize.transaction(
      { isolateLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        const createPostData = await this.postRepository.createPost(
          user_id,
          content,
          createdAt,
          updatedAt,
          { transaction: t }
        );

      // const createImageDataPromises = img_urls.map(async (img_url) => {});
        const createImageData = await this.postRepository.createImage(
          createPostData.post_id,
          img_url,
          createdAt,
          updatedAt,
          { transaction: t }
        );

        return {
          post_id: createPostData.post_id,
          content: createPostData.content,
          img_url: createImageData.img_url,
          createdAt: createPostData.createdAt,
          updatedAt: createPostData.updatedAt,
        };
      }
    );

    return result;
  };
};

module.exports = PostService;