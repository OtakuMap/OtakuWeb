export interface HashTag {
  hashTagId: number;
  name: string;
}

export interface RouteLocation {
  id: number;
  name: string;
  isSelected: boolean;
  latitude: number;
  longitude: number;
  animeName: string;
  hashtags: HashTag[]; // HashTag 타입으로 변경
}

export interface LocationDetail extends RouteLocation {
  address: string;
  relatedPlaces?: LocationDetail[];
}

export interface PlaceLikeDetailResponse {
  placeLikeId: number;
  placeName: string;
  animationName: string;
  lat: number;
  lng: number;
  isFavorite: boolean;
  hashtags: HashTag[];
}
