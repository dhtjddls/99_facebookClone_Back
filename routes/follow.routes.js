const express = require("express");
const router = express.Router();
const FollowerController = require("../controllers/follower.controller");
const followerController = new FollowerController()

router.get("/follow", followerController.getFollowerAll);
router.post("/follow", followerController.postFollower);
router.delete("/follow", followerController.deleteFollwer);

module.exports = router;
