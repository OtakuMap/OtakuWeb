// 로그인
export interface LoginRequest {
  userId: string;
  password: string;
}

export interface OAuthLoginRequest {
    code: string;
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
  
  export interface CheckEmailDuplicationResponse {
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
      userId: boolean;
    };
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
export interface LogoutResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: string;
}
