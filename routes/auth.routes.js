const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

//1. 회원가입 API
//api/auth/signup
router.post('/signup', usersController.signup);

//2.로그인 API
//api/auth/login
router.post('/login', usersController.login);

module.exports = router;
