export interface PlaceLike {
  id: number;
  placeId: number;
  name: string;
  isFavorite: boolean;
  detail: string;
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
