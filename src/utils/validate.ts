type SignupValues = {
    name: string;
    nickname: string;
    id: string;
    verificationCode: string;
    pw: string;
    pw2: string;
};

const idPattern = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;

const validateUser = (values: SignupValues): Partial<Record<keyof SignupValues, string>> => {
    const errors: Partial<Record<keyof SignupValues, string>> = {};

    if (!values.name) {
        errors.name = "이름은 필수 입력요소입니다.";
    } else if (values.name.length < 2) {
        errors.name = "이름은 최소 2자 이상이어야 합니다.";
    }

    if (!values.nickname) {
        errors.nickname = "닉네임은 필수 입력요소입니다.";
    } else if (values.nickname.length < 2) {
        errors.nickname = "닉네임은 최소 2자 이상이어야 합니다.";
    } else if (values.nickname.length > 20) {
        errors.nickname = "닉네임은 최대 20자 이하여야 합니다.";
    }

    if (!values.id) {
        errors.id = "아이디는 필수 입력요소입니다.";
    } else if (!idPattern.test(values.id)) {
        errors.id = "아이디는 유효한 이메일 형식이어야 합니다.";
    }

    if (!values.pw) {
        errors.pw = "비밀번호는 필수 입력요소입니다.";
    } else if (values.pw.length < 8) {
        errors.pw = "비밀번호는 8자 이상이어야 합니다.";
    } else if (values.pw.length > 16) {
        errors.pw = "비밀번호는 16자 이하여야 합니다.";
    }

    return errors;
};

const validateLogin = (values: SignupValues): Partial<Record<keyof SignupValues, string>> => {
    return validateUser(values); // 로그인 시에는 기본 검증만 수행
};

const validateSignup = (values: SignupValues): Partial<Record<keyof SignupValues, string>> => {
    const errors = validateUser(values); // 공통 검증

    if (!values.verificationCode) {
        errors.verificationCode = "인증번호는 필수 입력요소입니다.";
    }

    if (!values.pw2) {
        errors.pw2 = "비밀번호 확인 또한 필수 입력요소입니다.";
    } else if (values.pw !== values.pw2) {
        errors.pw2 = "비밀번호가 일치하지 않습니다.";
    }

    return errors;
};

export { validateLogin, validateSignup };
