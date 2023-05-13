const UsersService = require("../services/user.service");
class UsersController {
  uersService = new UsersService();

  searchUser = async (req, res, next) => {
    try {
      const { name } = req.body;
      const userInfos = await this.uersService.searchUser(name);

      res.status(200).json(userInfos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
}
module.exports = UsersController;
