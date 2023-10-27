export interface ExceptionObj {
    message: string;
}

export class UsersException {
    static USER_ALREADY_EXISTS: ExceptionObj = {
        message: '이미 회원가입 되어있는 계정입니다.',
    };
    static USER_NOT_EXISTS: ExceptionObj = {
        message: '존재하지 않는 계정입니다.',
    };
    static USER_ALREADY_CERTIFIED: ExceptionObj = {
        message: '이미 가입승인된 계정입니다.',
    };
    static USER_PASSWORD_NOT_MATCHED: ExceptionObj = {
        message: '패스워드가 일치하지 않습니다.',
    };
    static USER_SIGNUPCODE_NOT_MATCHED: ExceptionObj = {
        message: '인증코드가 일치하지 않습니다.',
    };
}
