export interface PlaceLike {
  id: number;
  placeId: number;
  name: string;
  detail: string;
  lat: number;
  lng: number;
  isFavorite: boolean;
}

export interface PlaceLikesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    placeLikes: PlaceLike[];
    hasNext: boolean;
    lastId: number;
  };
}
