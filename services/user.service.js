const UsersRepository = require("../repositories/user.repository");
const { Users } = require("../models/index");

class UsersService {
  usersRepository = new UsersRepository(Users);

  searchUser = async (name) => {
    const searchUserData = await this.usersRepository.searchUser(name);
    const userInfos = { userInfos: searchUserData };
    return userInfos;
  };
}

module.exports = UsersService;
