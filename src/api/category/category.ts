import instance from '@/api/axios';
import { EventsResponse, Genre, EventType, EventStatus } from '@/types/category/category';

export const getEventsByCategory = async (params: {
  genre?: Genre;
  status?: EventStatus;
  type?: EventType;
  page: number;
  size: number;
  title?: string;
}) => {
  // 열거형 값을 문자열로 변환하여 새 객체 생성
  const convertedParams = {
    page: params.page,
    size: params.size,
    title: params.title,
    // 열거형 값을 문자열로 변환 (undefined일 경우 전달하지 않음)
    genre: params.genre !== undefined ? Genre[params.genre] : undefined,
    status: params.status !== undefined ? EventStatus[params.status] : undefined,
    type: params.type !== undefined ? EventType[params.type] : undefined,
  };

  // undefined 값 제거
  const cleanParams = Object.fromEntries(
    Object.entries(convertedParams).filter(([_, value]) => value !== undefined),
  );

  console.log('API 요청 파라미터:', cleanParams);

  try {
    const response = await instance.get<EventsResponse>('/events/category', {
      params: cleanParams,
    });
    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    if (error.response) {
      console.error('서버 응답:', error.response.data);
    }
    throw error;
  }
};
