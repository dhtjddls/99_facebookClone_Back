const { Users } = require('../models');

class UserRepository {
  createUser = async (email, name, password, birthday, gender, file) => {
    const createUserData = await Users.create(
      email,
      name,
      password,
      birthday,
      gender,
      file
    );
    return createUserData;
  };

  findOneUser = async (email) => {
    const findOneUserData = await Users.findOne({
      where: { email: email },
    });
    return findOneUserData;
  };

  findOneByUserId = async (user_id) => {
    const userInfo = await Users.findOne({
      where: { user_id },
    });
    return userInfo;
  };
}

module.exports = UserRepository;
