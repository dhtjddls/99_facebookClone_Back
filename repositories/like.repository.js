const { Likes } = require("../models");

class LikeRepository {
  // 좋아요 등록
  createLike = async (post_id, user_id) => {
    const createLikeData = await Likes.create({ post_id, user_id });
    return createLikeData;
  };

  // 좋아요 확인
  findOneLike = async (post_id, user_id) => {
    const findOneLikeData = await Likes.findOne({ where: { post_id, user_id } });
    return findOneLikeData;
  };

  // 좋아요 취소
  deleteLike = async (post_id, user_id) => {
    const deleteLikeData = await Likes.destroy({ where: { post_id, user_id } });
    return deleteLikeData;
  };

  
}

module.exports = LikeRepository;
