export interface DeleteRoutesRequest {
  routeIds: number[];
}

export interface DeleteRoutesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
