const { Follows } = require("../models");
const { Users } = require("../models");

class FollowerRepository {
  getFollowerAll = async (user_id) => {
    console.log(user_id);
    const getFollowData = await Follows.findAll({
      where: { user_id },
      attributes: [
        "follow_id",
        "user_id",
        "follower_name",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });
    return getFollowData;
  };

  postFollower = async (user_id) => {
    const getUser = await Users.findOne({
      where: { user_id },
      attributes: ["user_id", "name", "profile_url"],
    });

    const postFollowData = await Follows.create({
      user_id,
      profile_url: getUser.profile_url,
      follower_name: getUser.name,
    });
    return postFollowData;
  };

  deleteFollower = async (user_id) => {
    const deleteFollowData = await Follows.destroy({
      where: { user_id },
    });
    return deleteFollowData;
  };
}
module.exports = FollowerRepository;
