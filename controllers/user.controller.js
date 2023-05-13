const UsersService = require("../services/user.service");
class UsersController {
  uerService = new UsersService();

  searchUser = async (req, res, next) => {
    try {
      const { name } = req.body;
      const searchUserData = await UsersService.searchUser(name);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
}
module.exports = UsersController;
