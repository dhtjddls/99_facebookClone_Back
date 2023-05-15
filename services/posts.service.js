const PostRepository = require("../repositories/posts.repository");
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
  // post_id로 하나의 게시글만 조회
  findOnePost = async (post_id) => {
    const findOnePostData = await this.postRepository.findOnePost(post_id);
    return findOnePostData;
  };

  // 모든 게시글 조회
  findAllPost = async () => {
    const findAllPostData = await this.postRepository.findAllPost();
    return findAllPostData;
  };

  // 모든 img 조회
  findAllImg = async () => {
    const findAllImgData = await this.postRepository.findAllImg();
    return findAllImgData;
  };

  // 게시글 좋아요 +1
  async plusPostLike(post_id) {
    await this.postRepository.plusPostLike(post_id);
  }

  // 게시글 좋아요 -1
  async minusPostLike(post_id) {
    await this.postRepository.minusPostLike(post_id);
  }
}

module.exports = PostService;
