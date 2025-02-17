export interface HashTag {
  hashTagId: number;
  name: string;
}

export interface Animation {
  animationId: number;
  name: string;
}

export interface PlaceLikeDetail {
  placeLikeId: number;
  placeId: number;
  placeName: string;
  animation: Animation; // animationName 대신 animation 객체로 변경
  lat: number;
  lng: number;
  isLiked: boolean;
  hashtags: HashTag[];
}

export interface PlaceLikeDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PlaceLikeDetail;
}
