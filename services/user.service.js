const UsersRepository = require("../repositories/user.repository");
const { users } = require("../models/index");

class UsersService {
  usersRepository = new UsersRepository(users);

  searchUser = async (name) => {
    const searchUserData = await this.usersRepository.searchUser(name);
    console.log(searchUserData);
  };
}

module.exports = UsersService;
