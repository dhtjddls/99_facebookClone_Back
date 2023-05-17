const UsersRepository = require('../../../repositories/users.repository');

// users.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockUsersModel = {
  create: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
};

let usersRepository = new UsersRepository(mockUsersModel);

describe('Layered Architecture Pattern Posts Repository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('SearchUser : FindAll Method', async () => {
    mockUsersModel.findAll = jest.fn(() => {
      return 'findAll Result';
    });

    const users = usersRepository.searchUser();
    expect(mockUsersModel.findAll).toHaveBeenCalledTimes(1);
    expect(users).toEqual('findAll Result');
  });

  test('Posts Repository createPost Method', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });
});
