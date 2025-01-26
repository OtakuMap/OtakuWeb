export interface PlaceLike {
  id: number;
  placeId: number;
  name: string;
  detail: string;
  lat: number;
  lng: number;
  savedAt: string;
  isFavorite: boolean;
}

export interface PlaceLikesResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    placeLikes: PlaceLike[];
    hasNext: boolean;
    lastId: number;
  };
}
