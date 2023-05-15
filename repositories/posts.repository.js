const { Posts, Images } = require("../models");

class PostRepository {
  // Posts Table에 content 저장
  createPost = async (user_id, content, createdAt, updatedAt) => {
    const createPostData = await Posts.create({
      user_id,
      content,
      createdAt,
      updatedAt,
    });

    return createPostData;
  };

  // Images Table에 img_url 저장
  createImage = async (post_id, img_url, createdAt, updatedAt) => {
      const createImageData = await Images.create({
        post_id,
        img_url,
        createdAt,
        updatedAt,
      });
      return createImageData;
    };

  findOnePost = async (post_id) => {
    const findOnePostData = await Posts.findOne({
      where: { post_id },
      attributes: [
        "post_id",
        "user_id",
        "content",
        "likes",
        "createdAt",
        "updatedAt",
      ],
    });
    return findOnePostData;
  };

  findAllPost = async () => {
    const findAllPostsData = await Posts.findAll({
      attributes: [
        "post_id",
        "user_id",
        "content",
        "likes",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });
    return findAllPostsData;
  };

  findAllImg = async () => {
    const findAllImagesData = await Images.findAll({
      attributes: ["image_id", "post_id", "img_url", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
    });
    return findAllImagesData;
  };

  plusPostLike = async (post_id) => {
    await Posts.increment("likes", { where: { post_id: post_id } });
  };

  minusPostLike = async (post_id) => {
    await Posts.decrement("likes", { where: { post_id: post_id } });
  };
}

module.exports = PostRepository;
