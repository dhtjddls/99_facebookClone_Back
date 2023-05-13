const { Op } = require("sequelize");

class UsersRepository {
  constructor(usersModel) {
    this.users = usersModel;
  }

  searchUser = async (name) => {
    const searchUserData = this.users.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return searchUserData;
  };
}

module.exports = new UsersRepository();
