// api/review/short-review.ts
import instance from '../axios';
import {
  ShortReviewRequest,
  ShortReviewResponse,
  PlaceResponse,
  ShortReviewListResponse,
  UpdateShortReviewRequest,
  UpdateShortReviewResponse,
  DeleteShortReviewResponse,
  UserResponse,
} from '@/types/review/short-review';

export const getPlaceDetail = async (placeId: number): Promise<PlaceResponse> => {
  try {
    const response = await instance.get(`/places/${placeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching place detail:', error);
    throw error;
  }
};

export const getShortReviewList = async (
  placeId: number,
  page: number,
): Promise<ShortReviewListResponse> => {
  try {
    // page는 0부터 시작하므로 그대로 전달
    const response = await instance.get(`/places/${placeId}/short-review`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const createShortReview = async (
  placeId: number,
  reviewData: ShortReviewRequest,
): Promise<ShortReviewResponse> => {
  try {
    const response = await instance.post(`/places/${placeId}/short-review`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const updateShortReview = async (
  reviewId: number,
  data: UpdateShortReviewRequest,
): Promise<UpdateShortReviewResponse> => {
  try {
    const response = await instance.patch(`/places/short-reviews/${reviewId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

export const deleteShortReview = async (reviewId: number): Promise<DeleteShortReviewResponse> => {
  try {
    const response = await instance.delete(`/places/short-reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};
