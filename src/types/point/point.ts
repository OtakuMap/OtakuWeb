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
  imp_uid: string; // 결제 고유번호 (필수)
}

export interface PointverifyResponse {
  code: number;
  message: string;
  response: PaymentCancelResponseData;
}

export interface PaymentCancelResponseData {
  channel: string;
  escrow: boolean;
  name: string;
  amount: number;
  currency: string;
  status: string;
  payMethod: string;
  pgProvider: string;
  embPgProvider: string;
  pgTid: string;
  applyNum: string;
  bankCode: string;
  bankName: string;
  cardCode: string;
  cardName: string;
  cardType: number;
  vbankCode: string;
  vbankName: string;
  vbankNum: string;
  vbankHolder: string;
  vbankDate: string; // ISO 8601 형식의 날짜 문자열
  vbankIssuedAt: number;
  cancelAmount: number;
  startedAt: number;
  paidAt: string; // ISO 8601 형식의 날짜 문자열
  failedAt: string; // ISO 8601 형식의 날짜 문자열
  cancelledAt: string; // ISO 8601 형식의 날짜 문자열
  failReason: string;
  cancelReason: string;
  receiptUrl: string;
  cancelHistory: CancelHistory[];
  cashReceiptIssued: boolean;
  customerUidUsage: string;
  impUid: string;
  merchantUid: string;
  customerUid: string;
  buyerName: string;
  buyerEmail: string;
  buyerTel: string;
  buyerAddr: string;
  buyerPostcode: string;
  customData: string;
  cardNumber: string;
  cardQuota: number;
}

export interface CancelHistory {
  amount: number;
  reason: string;
  pgTid: string;
  cancelledAt: number;
  receiptUrl: string;
}

// 결제 취소
export interface PaymentCancelRequest {
  imp_uid: string; // 결제 고유번호 (필수)
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
