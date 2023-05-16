const { Users, Follows } = require("../models");
const FollowerRepository = require("../repositories/follower.repository");
const UserRepository = require("../repositories/users.repository");

class FollowerService {
    followerRepository = new FollowerRepository(Follows);
    userRepository = new UserRepository(Users);

    getFollowerAll = async (user_id) => {

        const getUserData = await this.followerRepository.getFollowerAll(user_id)//3

        return {
            user_id: getUserData.dataValues.user_id,
            name: getUserData.dataValues.name,
            profile_url: getUserData.dataValues.profile_url,
        };

    };

    postFollower = async (user_id, follower_user_id) => {

        try {
            const findFollower = await this.followerRepository.findFollower(user_id, follower_user_id)
            if (findFollower) {
                return { message: "이미 추가된 팔로워 입니다" };
            } else {
                await this.followerRepository.postFollower(
                    user_id,
                    follower_user_id
                );
                return { message: "팔로워 추가 완료" };
            }
        } catch (error) {
            console.error(error)
        }

    };
    deleteFollower = async (user_id, follower_user_id) => {
        const deleteFollowData = await this.followerRepository.deleteFollower(
            user_id,
            follower_user_id
        );

        return { message: "팔로우 취소 완료" };
    };
}

module.exports = FollowerService;
