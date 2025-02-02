// types/review/search.ts
export interface ReviewImage {
  id: number;
  uuid: string;
  fileName: string;
  fileUrl: string;
}

export interface ReviewContent {
  reviewId: number;
  id: number;
  title: string;
  content: string;
  type: string;
  view: number;
  createdAt: string;
  reviewImage: ReviewImage;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SearchResult {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ReviewContent[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface SearchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: SearchResult;
}

export interface SearchParams {
  keyword: string;
  page?: number;
  size?: number;
  sort?: 'latest' | 'views';
}
