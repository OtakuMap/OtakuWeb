import instance from '@/api/axios'; // instance import로 변경
import {
  ShortReviewRequest,
  ShortReviewResponse,
  PlaceResponse,
  ShortReviewListResponse,
} from '../../types/review/short-review';

/**
 * 특정 장소의 정보를 가져오는 API
 */
export const getPlaceDetail = async (placeId: number): Promise<PlaceResponse> => {
  try {
    const response = await instance.get<PlaceResponse>(`/places/${placeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching place detail:', error);
    throw error;
  }
};

/**
 * 특정 명소의 한 줄 리뷰 목록 조회 API
 */
export const getShortReviewList = async (
  placeId: number,
  page: number,
): Promise<ShortReviewListResponse> => {
  try {
    const response = await instance.get<ShortReviewListResponse>(
      `/places/${placeId}/short-review?page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

/**
 * 한줄 리뷰 작성 API
 */
export const createShortReview = async (
  placeId: number,
  reviewData: ShortReviewRequest,
): Promise<ShortReviewResponse> => {
  try {
    const response = await instance.post<ShortReviewResponse>(
      `/places/${placeId}/short-review`,
      reviewData,
    );
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};
