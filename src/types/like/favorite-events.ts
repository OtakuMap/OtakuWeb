export interface FavoriteEventResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    routeLikeId: number;
    isFavorite: boolean;
  };
}
