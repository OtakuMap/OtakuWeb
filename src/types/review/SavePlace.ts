// types/review/SavePlace.ts
export interface SavePlaceRequest {
  animationId: number;
}

export interface SavePlaceResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    placeLikeId: number;
  };
}
