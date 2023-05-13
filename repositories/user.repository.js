const { Op } = require("sequelize");

class UsersRepository {
  constructor(usersModel) {
    this.Users = usersModel;
  }

  searchUser = async (name) => {
    const searchUserData = this.Users.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return searchUserData;
  };
}

module.exports = UsersRepository;
