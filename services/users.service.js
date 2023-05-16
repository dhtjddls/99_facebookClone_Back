const UserRepository = require('../repositories/users.repository');
const { Users } = require('../models');
const { Tokens } = require('../models');
const jwt = require('jsonwebtoken');
const TokenRepository = require('../repositories/tokens.repository');
const { emit } = require('nodemon');
console.log(Users);
class UserService {
  userRepository = new UserRepository(Users);
  tokenRepository = new TokenRepository(Tokens);

  signup = async (email, name, password, birthday, gender, profile_url) => {
    const user = await this.userRepository.createUser(
      email,
      name,
      password,
      birthday,
      gender,
      profile_url
    );

    let userInfo = {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
      password: user.password,
      birthday: user.birthday,
      gender: user.gender,
      profile_url: user.profile_url,
    };
    return userInfo;
  };

  login = async (email) => {
    const user = await this.userRepository.findOneUser(email);
    const userId = user.user_id;
    const accessToken = jwt.sign({ user_id: user.user_id }, 'secret', {
      expiresIn: '10s',
    });
    const accessObject = { type: 'Bearer', token: accessToken };

    const refreshToken = jwt.sign({ user_id: user.user_id }, 'secret', {
      expiresIn: '7d',
    });

    //생성한 refresh토큰을 repo에 저장하는 과정
    await this.tokenRepository.setRefreshToken(refreshToken, userId);

    return { accessObject, refreshToken };
  };

  findOneUser = async (email) => {
    const findOneUserData = this.userRepository.findOneUser(email);

    return findOneUserData;
  };

  findNameProfile = async (email) => {
    const user = await this.userRepository.findOneUser(email);
    console.log('유저정보다이놈들아', user);

    let nameProfiles = {
      name: user.name,
      profile_url: user.profile_url,
    };
    console.log(nameProfiles);
    return nameProfiles;
  };

  searchUser = async (name) => {
    const searchUserData = await this.userRepository.searchUser(name);
    const userInfos = { userInfos: searchUserData };
    return userInfos;
  };
}

module.exports = UserService;
