const UserRepository = require('../repositories/users.repository');
const { Users } = require('../models');
const { Tokens } = require('../models');
const jwt = require('jsonwebtoken');
const TokenRepository = require('../repositories/tokens.repository');

class UserService {
  userRepository = new UserRepository(Users);
  tokenRepository = new TokenRepository(Tokens);

  signup = async (email, name, password, birthday, gender, file) => {
    const user = await this.userRepository.createUser(
      email,
      name,
      password,
      birthday,
      gender,
      file
    );

    let userInfo = {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
      password: user.password,
      birthday: user.birthday,
      gender: user.gender,
      file: user.file,
    };
    return userInfo;
  };

  login = async (email) => {
    const user = await this.userRepository.findOneUser(email);
    const userId = user.user_id;
    const accessToken = jwt.sign({ user_id: user.user_id }, 'secret', {
      expiresIn: '120s',
    });
    const accessObject = { type: 'Bearer', token: accessToken };

    const refreshToken = jwt.sign({ user_id: user.user_id }, 'secret', {
      expiresIn: '7d',
    });
    await this.tokenRepository.setRefreshToken(refreshToken, userId);

    return { accessObject, refreshToken: refreshToken };
  };

  findOneUser = async (email) => {
    const findOneUserData = this.userRepository.findOneUser(email);
    return findOneUserData;
  };
}

module.exports = UserService;
