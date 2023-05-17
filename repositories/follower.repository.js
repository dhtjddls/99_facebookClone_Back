const { Users, Sequelize } = require("../models");
const { Op } = require("sequelize");


class FollowerRepository {
  constructor(Follows) {
    this.Follows = Follows;
    this.Users = Users;
  }

  getFollowerAll = async (user_id) => {

    const followList = await this.Follows.findAll({
      user_id,
    });
    const followUserIds = followList.map((e) => e.follower_user_id);
    const userInfos = await this.Users.findAll({
      where: {
        user_id: {
          [Op.in]: followUserIds,
        },
      },
    });
    return [followList, userInfos]
  }


  //  //현재 user_id : 3
  //   //Follows 모델을 전체조회
  //   const followList = await this.Follows.findAll({
  //     //어디서 ? 
  //     //user_id과 follower_user_id를 동시에 만족하는 데이터
  //     where: {
  //       //user_id:3
  //       user_id: user_id,
  //       //follower_user_id: 친구추가를 한 사람의
  //       //user_id가 follwer_user_id가됨
  //       follower_user_id: {
  //         [Op.in]: Sequelize.literal(`(SELECT user_id FROM Users)`),
  //       },
  //     },
  //     //테이블을 include
  //     include: [
  //       //Users모델의
  //       {
  //         model: Users,
  //         as: "User",
  //         //follwer_user_id:1
  //         //user_id,profile_url, name만 참조함
  //         attribute: ["user_id", "profile_url", "name"],
  //       },
  //     ],
  //   });
  //   console.log(followList[0].User)
  //   return followList

  // getFollowerAll = async (user_id) => {//3
  //   const findAllPostsData = await this.Users.findAll({
  //     attributes: ["user_id", "name", "profile_url"],
  //     include: [
  //       {
  //         model: Follows,
  //         where: { follow_user_id: Sequelize.col("Users.user_id") }
  //       }
  //     ],
  //   });
  //   console.log(findAllPostsData)
  //   return findAllPostsData
  // }

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
