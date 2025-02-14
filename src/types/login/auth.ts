// 로그인
export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    id: number;
    accessToken: string;
    refreshToken: string;
  };
}

export interface OAuthLoginRequest {
  code: string;
}

export interface LogoutResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: string;
}

// 회원가입
export interface RegisterRequest {
  name: string;
  userId: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface RegisterResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    id: number;
    createdAt: string;
  };
}

// 이메일 중복 여부
export interface CheckEmailDuplicationRequest {
  email: string;
}

export interface CheckEmailDuplicationResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    duplicated: boolean;
  };
}

// 아이디 중복 여부
export interface CheckIDDuplicationRequest {
  userId: string;
}

export interface CheckIDDuplicationResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    duplicated: boolean;
  };
}

// 아이디찾기
export interface SearchIdRequest {
  name: string;
  email: string;
}

export interface SearchIdResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    userId: string;
  };
}

// 비밀번호 찾기
export interface SearchPwRequest {
  name: string;
  userId: string;
}

export interface SearchPwResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

// 비밀번호 찾기시 이메일 코드 전송
export interface SearchPwSendEmailVerifyCodeRequest {
  code: string;
  userId: string;
}

export interface SearchPwSendEmailVerifyCodeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    verified: boolean;
  };
}

// 회원가입시 이메일 코드 전송
export interface sendEmailVerifyCodeRequest {
  email: string;
}

export interface sendEmailVerifyCodeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

// 회원가입시 이메일 코드 인증
export interface EmailVerifyCodeRequest {
  code: string;
  email: string;
}

export interface EmailVerifyCodeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    verified: boolean;
  };
}
