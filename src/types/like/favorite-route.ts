// types/like/favorite-route.ts

// API 요청 시 body에 들어갈 타입
export interface FavoriteRouteRequest {
  isFavorite: boolean;
}

// API 기본 응답 구조를 위한 제네릭 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 즐겨찾기 토글 응답의 result 타입
export interface FavoriteRouteResult {
  routeLikeId: number;
  isFavorite: boolean;
}

// 전체 응답 타입
export type FavoriteRouteResponse = ApiResponse<FavoriteRouteResult>;
