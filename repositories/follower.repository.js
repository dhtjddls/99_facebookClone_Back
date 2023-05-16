class FollowerRepository {
  constructor(Follows) {
    this.Follows = Follows;
  }

  getFollowerAll = async (user_id) => {
    const getFollowData = await this.Follows.findAll({
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

  postFollower = async (user_id, getUser) => {
    const postFollowData = await this.Follows.create({
      user_id,
      profile_url: getUser.profile_url,
      follower_name: getUser.name,
    });
    return postFollowData;
  };

  deleteFollower = async (user_id) => {
    const deleteFollowData = await this.Follows.destroy({
      where: { user_id },
    });
    return deleteFollowData;
  };
}
module.exports = FollowerRepository;
