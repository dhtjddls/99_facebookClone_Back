const express = require("express");
const router = express.Router();
const FollowerController = require("../controllers/follower.controller");
const followerController = new FollowerController()

router.get("/", followerController.getFollowerAll);
router.post("/", followerController.postFollower);
router.delete("/", followerController.deleteFollower);

module.exports = router;
