export interface RouteLike {
  id: number;
  routeId: number;
  name: string;
  reviewId: number;
  type: string; // 'event' | 'place'
  isFavorite: boolean;
}

export interface GetRouteLikesRequest {
  isFavorite?: boolean;
  lastId?: number;
  limit?: number;
}

export interface GetRouteLikesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    routeLikes: RouteLike[];
    hasNext: boolean;
    lastId: number;
  };
}
