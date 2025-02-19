// types/review/AddAnimation.ts

// 공통 응답 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 애니메이션 등록 응답 타입
export interface AddAnimationResponse {
  animationId: number;
  name: string;
  createdAt: string;
}

// 애니메이션 검색 결과 아이템 타입
export interface AnimationItem {
  animationId: number;
  name: string;
}

// 애니메이션 검색 응답 타입
export interface SearchAnimationsResponse {
  animations: AnimationItem[];
  listSize: number;
}

// 애니메이션 등록 요청 타입
export interface AddAnimationRequest {
  name: string;
}
