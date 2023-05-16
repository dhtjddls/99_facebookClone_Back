const UserService = require('../services/users.service');

class UserController {
  userService = new UserService();

  signup = async (req, res) => {
    const { email, name, password, birthday, gender } = req.body;
    const img_url = req.img_url[0];
    console.log(req.img_url);

    try {
      if (!email) {
        res.status(412).json({
          errorMessage: '이메일을 입력해 주십시오.',
        });
        return;
      }

      if (!name) {
        res.status(412).json({
          errorMessage: '이름을 입력해 주십시오.',
        });
        return;
      }

      if (!password) {
        res.status(412).json({
          errorMessage: '비밀번호를 입력해 주십시오.',
        });
        return;
      }

      if (!birthday) {
        res.status(412).json({
          errorMessage: '생년월일을 입력해 주십시오.',
        });
        return;
      }

      if (!gender) {
        res.status(412).json({
          errorMessage: '성별을 입력해 주십시오.',
        });
        return;
      }

      //body 데이터 입력 형식
      // console.log(new DATE(birthday));//"year, monthIndex,day"
      const birthDay = new Date(birthday);
      const year = Number(birthDay[0]);
      const monthIndex = Number(birthDay[1]) - 1;
      const day = Number(birthDay[2]);

      if (isNaN(birthDay)) {
        res.status(412).json({
          errorMessage: '유효하지 않은 날짜 형식입니다.',
        });
        return;
      }

      // const dateObj = new Date(year, monthIndex, day);
      // const formattedDate = dateObj.toISOString().split('T');

      const formattedDate = birthDay.toISOString().split('T')[0];

      //날짜는 해결해야함
      const signupData = await this.userService.signup({
        email,
        name,
        password,
        birthday: formattedDate,
        gender,
        profile_url: img_url,
      });

      console.log(signupData);
      res.status(201).json({ message: '회원가입에 성공했습니다.', signupData });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
      });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const user = await this.userService.findOneUser(email);

    try {
      if (!user || password !== user.password) {
        res.status(412).json({
          errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
        });
        return;
      }

      //userData는 accessObject, refreshToken
      const userData = await this.userService.login(email);

      //Bearer, token 따로 따로 지정해줌
      res.cookie(
        'Authorization',
        `${userData.accessObject.type} ${userData.accessObject.token}`
      );

      res.cookie('refreshtoken', userData.refreshToken);
      res.status(200).json({
        message: '로그인에 성공하였습니다.',
        Authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
        refreshtoken: userData.refreshToken,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        errorMessage: '로그인에 실패하였습니다.',
      });
    }
  };

  searchUser = async (req, res, next) => {
    try {
      const { name } = req.body;
      const userInfos = await this.userService.searchUser(name);

      res.status(200).json(userInfos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
}

module.exports = UserController;
