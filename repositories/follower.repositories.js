const { follows } = require("../models/follows");
const { users } = require("../models/users")

class FollowerRepository {

    getFollowerAll = async (user_id) => {
        const getFollowData = await follows.findAll(
            {
                where: { user_id },
                attributes: ["follow_id", "user_id", "follower_name", "createdAt", "updatedAt"],
                order: [['follow_id', 'DESC']]
            }
        )
        return getFollowData
    }

    postFollower = async (user_id) => {
        const postFollowData = await follows.create({
            follow_id,
            user_id,
            profile_url: prorile_url,
            follower_name: name
        })
        return postFollowData
    }

    deleteFollwer = async (follow_id) => {

        const deleteFollowData = await follows.destroy({
            where: { follow_id }
        })
        return deleteFollowData
    }

}
module.exports = FollowerRepository