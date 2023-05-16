const FollowerController = require("../../../controllers/follower.controller");

//service계층에서 사용하는 메소드 가짜(mock) 함수 정의
let mockFollowersService = {
    getFollowerAll: jest.fn(),
    postFollower: jest.fn(),
    deleteFollower: jest.fn()
}

let mockRequest = {
    body: jest.fn(),
};

let mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
};

// let mockNext = jest.fn();

let followerController = new FollowerController();
followerController.followerService = mockFollowersService;


describe("팔로워 컨트롤러 계층 유닛 테스트", () => {
    // 각 test가 실행되기 전에 실행됩니다.
    beforeEach(() => {
        jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

        // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
    });

    test("팔로워 컨트롤러 postFollower 메소드 성공 테스트", async () => {
        const postFollowerRequestBody = {
            user_id: 1
        };

        mockRequest.body = postFollowerRequestBody;

        const postFollowerReturnValue = { "message": "팔로워 추가 완료" };


        //실행 =  { "message": "팔로워 추가 완료" };
        mockFollowersService.postFollower = jest.fn(() => postFollowerReturnValue);

        await followerController.postFollower(mockRequest, mockResponse);

        //req 
        expect(mockFollowersService.postFollower).toHaveBeenCalledTimes(1);
        expect(mockFollowersService.postFollower).toHaveBeenCalledWith(
            postFollowerRequestBody.user_id,
        );

        //res
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            "message": "팔로워 추가 완료"
        });
    });

    test("팔로워 컨트롤러 postFollower 메소드 실패 테스트", async () => {
        const postFollowerRequestBody = {
            user_id: "1"
        };

        mockRequest.body = postFollowerRequestBody;

        const postFollowerFailedReturnValue = { "message": "팔로워 추가 실패" };

        mockFollowersService.postFollower = jest.fn(() => postFollowerFailedReturnValue);
        await followerController.postFollower(mockRequest, mockResponse);

        expect(mockFollowersService.postFollower).toHaveBeenCalledTimes(1);
        expect(mockFollowersService.postFollower).toHaveBeenCalledWith(
            postFollowerRequestBody.user_id,
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            "message": "팔로워 추가 실패"
        });

    })

    test("팔로워 컨트롤러 getFollwerAll 메소드 성공 테스트", async () => {
        const getFollwerAllReturnValue = {
            follow: [
                {
                    follow_id: 1,
                    user_id: 1,
                    follower_name: "kim_cool",
                    createdAt: "2022-07-25T07:45:56.000Z",
                    updatedAt: "2022-07-25T07:52:09.000Z",
                },
                {
                    follow_id: 2,
                    user_id: 1,
                    follower_name: "kim_cool",
                    createdAt: "2022-07-25T07:45:56.000Z",
                    updatedAt: "2022-07-25T07:52:09.000Z",
                },

            ]
        }

        const getFollwerAllRequestBody = {
            user_id: 1,
        };
        mockRequest.body = getFollwerAllRequestBody

        mockFollowersService.getFollowerAll = jest.fn(
            () => getFollwerAllReturnValue
        );

        await followerController.getFollowerAll(mockRequest, mockResponse);

        expect(mockFollowersService.getFollowerAll).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        //컨트롤러에 대한 파라미터를 확인하는 
        expect(mockResponse.json).toHaveBeenCalledWith({ follow: getFollwerAllReturnValue });
    });

    test("팔로워 컨트롤러 deleteFollower 메소드 성공 테스트", async () => {
        const updateCommentRequestBody = {
            comment: "Comment_Success",
        };
        const updateCommentRequestParams = {
            worldcup_id: 11,
            comment_id: 12,
        };
        const updateCommentResLocals = {
            user_id: 4,
        };

        mockRequest.body = updateCommentRequestBody;
        mockRequest.params = updateCommentRequestParams;
        mockResponse.locals.user = updateCommentResLocals;

        const updateCommentReturnValue = { message: "댓글 수정 완료" };

        mockCommentsService.updateComment = jest.fn(() => updateCommentReturnValue);

        const validationResult = updateCommentSchema.validate(mockRequest.body);
        expect(validationResult.value).toEqual(updateCommentRequestBody);

        mockWorldcupService.getOneWorldcup = jest.fn(() => {
            return {
                message: "하나 있긴 함.",
            };
        });
        mockCommentsService.findOneComment = jest.fn(() => {
            return {
                user_id: 4,
            };
        });

        await commentsController.updateComment(mockRequest, mockResponse, mockNext);

        expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);
        expect(mockCommentsService.findOneComment).toHaveBeenCalledTimes(1);
        expect(mockCommentsService.updateComment).toHaveBeenCalledTimes(1);
        expect(mockCommentsService.updateComment).toHaveBeenCalledWith(
            updateCommentRequestBody.comment,
            updateCommentRequestParams.worldcup_id,
            updateCommentRequestParams.comment_id
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "댓글 수정 완료",
        });
    });

});