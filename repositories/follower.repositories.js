const { follows } = require("../models/follows");

class FollowerRepository {

    getFollowerAll = async (user_id) => {
        const getFollowData = await follows.findAll({
            where: { user_Id: user_id },
            attributes: []

        })
        return getFollowData
    }

    postFollower = async (user_id) => {
        const postFollowData = await follows.create({


        })
        return postFollowData
    }

    deleteFollwer = async (follow_id, user_id) => {

        const deleteFollowData = await follows.destroy({

        })
        return deleteFollowData
    }

}
module.exports = FollowerRepository