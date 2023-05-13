const { posts } = require("../models");

class PostRepository {
    createPost = async (userId, nickname, title, content, createdAt, updatedAt) => {
        const createPostData = await posts.create({
          userId,
          nickname,
          title,
          content,
          createdAt,
          updatedAt
        });
    
        return createPostData;
      };
}

module.exports = PostRepository