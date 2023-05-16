const FollowerRepository = require("../../../repositories/follower.repository");
const FollowerService = require("../../../services/follower.service");


//service계층에서 사용하는 메소드 가짜(mock) 함수 정의
let mockFollowersModel = {
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn()
}

let mockRequest = {
    body: jest.fn(),
};

let mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
};


let followersRepository = new FollowerRepository(mockFollowersModel);


describe("팔로워 레포지토리계층 유닛 테스트", () => {
    // 각 test가 실행되기 전에 실행됩니다.
    beforeEach(() => {
        jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    });

    test("팔로워 레포지토리계층 postFollower 메소드 성공 테스트", async () => {
        mockFollowersModel.create = jest.fn(() => {
            return { "message": "팔로워 추가 완료" };
        });

        const postFollowerBody = {
            user_id: 1,
            getUser:
            {
                "follow_id": 1,
                "user_id": 1,
                "profile_url": "https://profileimg.jpg123",
                "follwer_name": "차무식",
                "createdAt": "2022-07-25T07:45:56.000Z",
                "updatedAt": "2022-07-25T07:52:09.000Z"
            }
        };

        const postFollowerData = await followersRepository.postFollower(
            postFollowerBody.user_id,
            postFollowerBody.getUser
        );

        expect(postFollowerData).toEqual({ "message": "팔로워 추가 완료" });
        expect(mockFollowersModel.create).toHaveBeenCalledTimes(1);
    });



    test("팔로워 레포지토리계층 getFollwerAll 메소드 성공 테스트", async () => {
        mockFollowersModel.findAll = jest.fn(() => {
            return [
                {
                    "follow_id": 1,
                    "user_id": 1,
                    "profile_url": "https://profileimg.jpg123",
                    "follwer_name": "차무식",
                    "createdAt": "2022-07-25T07:45:56.000Z",
                    "updatedAt": "2022-07-25T07:52:09.000Z"
                },
                {
                    "follow_id": 2,
                    "user_id": 1,
                    "profile_url": "https://profileimg.jpg123",
                    "follwer_name": "차무식",
                    "createdAt": "2022-07-25T07:45:56.000Z",
                    "updatedAt": "2022-07-25T07:52:09.000Z"
                },
            ];
        });

        const getFollowerBody = {
            user_id: 1
        }

        const getFollowAllData = await followersRepository.getFollowerAll(
            getFollowerBody.user_id
        );

        expect(mockFollowersModel.findAll).toHaveBeenCalledTimes(1);
        expect(getFollowAllData).toEqual([
            {
                "follow_id": 1,
                "user_id": 1,
                "profile_url": "https://profileimg.jpg123",
                "follwer_name": "차무식",
                "createdAt": "2022-07-25T07:45:56.000Z",
                "updatedAt": "2022-07-25T07:52:09.000Z"
            },
            {
                "follow_id": 2,
                "user_id": 1,
                "profile_url": "https://profileimg.jpg123",
                "follwer_name": "차무식",
                "createdAt": "2022-07-25T07:45:56.000Z",
                "updatedAt": "2022-07-25T07:52:09.000Z"
            },
        ]);


    });

    test("팔로워 레포지토리계층 deleteFollower 메소드 성공 테스트", async () => {

        mockFollowersModel.destroy = jest.fn(() => {
            return { "message": "팔로워 취소 완료" }
        });


        const deleteFollowerBody = {
            user_id: 1,
        };

        const deleteFollowerData = await followersRepository.deleteFollower(
            deleteFollowerBody.user_id
        )

        expect(deleteFollowerData).toEqual({ "message": "팔로워 취소 완료" });
        expect(mockFollowersModel.destroy).toHaveBeenCalledTimes(1);
        expect(mockFollowersModel.destroy).toHaveBeenCalledWith({
            where: { user_id: deleteFollowerBody.user_id }
        });
    });

});