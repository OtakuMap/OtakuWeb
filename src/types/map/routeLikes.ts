export interface RouteLike {
  id: number;
  routeId: number;
  name: string;
  isFavorite: boolean;
}

export interface RouteLikesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    routeLikes: RouteLike[];
    hasNext: boolean;
    lastId: number;
  };
}
