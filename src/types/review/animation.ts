// types/review/animation.ts
export interface PlaceAnimation {
  placeAnimationId: number;
  animationId: number;
  animationName: string;
}

export interface PlaceAnimationsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    placeAnimations: PlaceAnimation[];
    listSize: number;
  };
}

export interface AnimationResult {
  isSuccess: boolean;
  result?: {
    placeAnimations: PlaceAnimation[];
    listSize: number;
  };
  message?: string;
}
