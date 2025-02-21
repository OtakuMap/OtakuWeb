// types/review/point.ts

export interface PointBalance {
  userId: string;
  point: number;
}

export interface PointBalanceResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PointBalance;
}
