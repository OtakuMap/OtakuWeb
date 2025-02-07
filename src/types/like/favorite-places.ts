// types/like/favorite-places.ts

export interface FavoritePlaceResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    routeLikeId: number;
    isFavorite: boolean;
  };
}
