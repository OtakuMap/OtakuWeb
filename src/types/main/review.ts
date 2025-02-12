export interface ReviewImage {
  id: number;
  uuid: string;
  fileName: string;
  fileUrl: string;
}

export interface Review {
  id: number;
  title: string;
  reviewImage: ReviewImage;
  view: number;
}

export interface TopReviewsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    reviews: Review[];
  };
}
