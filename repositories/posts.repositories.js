const { posts, images } = require("../models");

class PostRepository {
  createPost = async (user_id, content, createdAt, updatedAt) => {
    const createPostData = await posts.create({
      user_id,
      content,
      createdAt,
      updatedAt
    });

    return createPostData;
  };

  createImage = async (img_url, createdAt, updatedAt) => {
    const createImageData = await images.create({
      img_url,
      createdAt,
      updatedAt
    });

    return createImageData;
  };
}

module.exports = PostRepository