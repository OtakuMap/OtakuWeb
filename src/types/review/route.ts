// types/review/route.ts
export interface RouteData {
  id: number;
  order: number;
  name: string;
  description: string;
}

export interface RouteApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

export interface RouteDetailsResponse {
  routeId: number;
  routeData: RouteData[];
}
