const { Users, Follows } = require("../models");
const FollowerRepository = require("../repositories/follower.repository");
const UserRepository = require("../repositories/users.repository");

class FollowerService {
    followerRepository = new FollowerRepository(Follows);
    userRepository = new UserRepository(Users);

    getFollowerAll = async (user_id) => {
        const getUserData = await this.followerRepository.getFollowerAll(user_id)

        return getUserData.map((e) => {
            return {
                follow_id: e.follow_id,
                user_id: e.user_id,
                follower_user_id: e.follower_user_id,
                profile_url: e.User.profile_url,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
            };
        });
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
