const jwt = require('jsonwebtoken');
const { Token } = require('../models');

class TokenRepository {
  setRefreshToken = async (refreshToken, userId) => {
    const existRefreshToken = await Token.findOne({
      where: { user_id: userId },
      attributes: ['user_id'],
    });

    if (!existRefreshToken) {
      const rToken = await Token.create({
        user_id: userId,
        token: refreshToken,
      });
      console.log(rToken);
      return rToken;
    }
  };

  getRefreshToken = async (userId) => {
    const token = await Token.findOne({
      where: { user_id: userId },
      attributes: ['user_id'],
    });
    return token;
  };

  //   deleteRefreshToken = async (user_id) => {
  //     await Tokens.destroy({
  //       where: { user_id },
  //     });
  //   };

  //   deleteRefreshToken2 = async (refreshToken) => {
  //     console.log("deleteRefreshToken2 refreshToken 매개변수 ==>", refreshToken);

  //     await Tokens.destroy({
  //       where: { token: refreshToken },
  //     });
  //   };
}

module.exports = TokenRepository;
