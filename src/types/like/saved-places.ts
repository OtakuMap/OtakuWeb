export interface SavedPlace {
  id: number;
  placeId: number;
  name: string;
  detail: string;
  lat: number;
  lng: number;
  savedAt: string;
  isFavorite: boolean;
}

export interface SavedPlacesResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    placeLikes: SavedPlace[];
    hasNext: boolean;
    lastId: number;
  };
}

export interface SavedPlacesParams {
  lastId?: number;
  limit?: number;
}
