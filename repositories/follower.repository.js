const { Users, Sequelize } = require("../models");


class FollowerRepository {
  constructor(Follows) {
    this.Follows = Follows;
  }

  getFollowerAll = async (user_id) => {
    const findAllPostsData = await this.Follows.findAll({
      where: { user_id },
      include: [
        {
          model: Users,
          attributes: ["profile_url"],
          require: true,
        },
      ],
      attributes: [
        "follow_id",
        "user_id",
        "follower_user_id",
        "createdAt",
        "updatedAt",
      ]
    });
    return findAllPostsData;
  }


  findFollower = async (user_id, follower_user_id) => {
    const postFollowData = await this.Follows.findOne({
      where: {
        user_id: user_id,
        follower_user_id: follower_user_id,
      }
    });
    return postFollowData;
  };


  postFollower = async (user_id, follower_user_id) => {
    const postFollowData = await this.Follows.create({
      user_id: user_id,
      follower_user_id: follower_user_id,
    });
    return postFollowData;
  };


  deleteFollower = async (user_id, follower_user_id) => {
    const deleteFollowData = await this.Follows.destroy({
      where: { user_id: user_id, follower_user_id: follower_user_id },
    });
    return deleteFollowData;
  };





}

module.exports = FollowerRepository;
