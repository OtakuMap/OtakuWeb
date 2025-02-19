// 후기 구매 /api/reviews/purchase
export interface ReviewpurchaseRequest {
  reviewId: string;
}

export interface ReviewpurchaseResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    remainPoints: string;
  };
}

// 포인트 잔액 조회 /api/points/balance (get)
export interface PointbalanceResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    userId: string;
    point: string;
  };
}

// 포인트 충전
export interface PointchargeRequest {
  point: string;
}

export interface PointchargeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    point: string;
  };
}

// 포인트 결제 검증
export interface PointverifyRequest {
  impUid: string;
  merchantUid: string;
  amount: number;
}

export interface PointverifyResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

// 포인트 충전 내역 확인 /api/points/transactions/charges (get)
export interface TransactionsChargeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    pointList: {
      chargedBy: string;
      point: number;
      chargedAt: string;
    }[];
    listSize: number;
    totalPage: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
  };
}

// 구매 내역 확인 /api/points/transactions/usages (get)
export interface TransactionsUsagesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    transactions: {
      title: string;
      point: number;
      purchasedAt: string;
    }[];
    totalPages: number;
    totalElements: number;
    isLast: boolean;
  };
}

// 수익 내역 확인  /api/points/transactions/earnings
export interface TransactionsEarningsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    transactions: {
      title: string;
      point: number;
      earnedAt: string;
    }[];
    totalPages: number;
    totalElements: number;
    isLast: boolean;
  };
}
