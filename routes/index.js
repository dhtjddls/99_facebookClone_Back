const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");
const postRouter = require("./post.routes");
const userRouter = require("./user.routes");
const followRouter = require("./follow.routes");
// 양식
router.use("/auth", [authRouter]);
router.use("/post", [postRouter, followRouter]);
router.use("/user", [userRouter]);

module.exports = router;
