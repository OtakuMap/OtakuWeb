// export interface PlaceAnimation {
//   placeAnimationId: number;
//   animationId: number;
//   animationName: string;
// }

// export interface PlaceAnimationsResponse {
//   isSuccess: boolean;
//   code: string;
//   message: string;
//   result: {
//     placeAnimations: PlaceAnimation[];
//     listSize: number;
//   };
// }

// 타입 정의 수정
export interface PlaceAnimation {
  place_animationId: number;
  animationId: number;
  title: string;
}

export interface PlaceAnimationsResponse {
  results: PlaceAnimation[];
}
