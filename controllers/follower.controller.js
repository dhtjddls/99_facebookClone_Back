const FollowerService = require("../services/follower.services")

class FollowerController {
    followerService = new FollowerService()

    getFollowerAll = async (req, res, next) => {
        const { user_id } = res.locals.user
        try {
            const getFollowData = this.followerService.getFollowerAll(user_id)
            return res.status(200).json({ follow: getFollowData })
        } catch (error) {
            console.error(error)
            return res.status(400).json({ "errorMessage": "팔로워 목록 조회에 실패하였습니다." })
        }
    }

    postFollower = async (req, res, next) => {
        const { user_id } = res.locals.user
        try {
            const postFollowData = await this.followerService.postFollower(user_id);

            return postFollowData
        } catch (error) {
            console.error(error)
            return res.status(400).json({ "errorMessage": "팔로워 추가에 실패하였습니다." })
        }


    }

    deleteFollwer = async (req, res, next) => {
        const { follow_id } = res.locals.user
        try {
            const deleteFollowData = await this.followerService.deleteFollwer(follow_id, user_id);
            return deleteFollowData;
        } catch (error) {
            console.error(error)
            return res.status(400).json({ "errorMessage": "팔로워 추가에 실패하였습니다." })
        }



    }


}

module.exports = FollowerController