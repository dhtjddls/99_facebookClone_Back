const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/user.controller");

const usersController = new UsersController();

router.post("/", usersController.searchUser);

module.exports = router;
