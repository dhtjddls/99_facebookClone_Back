const { Posts, Images } = require('../models');

class PostRepository {
  createPost = async (user_id, content, createdAt, updatedAt) => {
    const createPostData = await Posts.create({
      user_id,
      content,
      createdAt,
      updatedAt,
    });

    return createPostData;
  };

  createImage = async (img_url, createdAt, updatedAt) => {
    if (Array.isArray(img_url)) {
      img_url.forEach(async (url) => {
        const createImageData = await Images.create({
          img_url: url,
          createdAt,
          updatedAt,
        });
        return createImageData;
      });
    } else {
      const createImageData = await Images.create({
        img_url,
        createdAt,
        updatedAt,
      });
      return createImageData;
    }
  };
}

module.exports = PostRepository;
