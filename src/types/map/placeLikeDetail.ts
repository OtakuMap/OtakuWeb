export interface HashTag {
  hashTagId: number;
  name: string;
}

export interface PlaceLikeDetail {
  placeLikeId: number;
  placeName: string;
  animationName: string;
  lat: number;
  lng: number;
  isFavorite: boolean;
  hashtags: HashTag[];
}

export interface PlaceLikeDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PlaceLikeDetail;
}
