const { Users, Sequelize } = require("../models");


class FollowerRepository {
  constructor(Follows) {
    this.Follows = Follows;
    this.Users = Users;
  }

  getFollowerAll = async (user_id) => {
    const findAllPostsData = await this.Follows.findOne({
      where: { user_id }, //3
      attributes: ["follower_user_id", "createdAt", "updatedAt"], //7
      order: [["createdAt", "DESC"]]
    });

    const recentFollowerId = findAllPostsData.dataValues.follower_user_id

    const findAllUsersData = await this.Users.findOne({
      where: { user_id: recentFollowerId },//7
      attributes: ["user_id", "name", "profile_url"]
    })
    return findAllUsersData;

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
