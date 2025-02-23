import instance from '@/api/axios';
import { EventsResponse, Genre, EventType, EventStatus } from '@/types/category/category';

export const getEventsByCategory = async (params: {
  genre?: Genre | null;
  status?: EventStatus;
  type?: EventType;
  page: number;
  size: number;
  title?: string;
  isAnimeTab?: boolean;
}) => {
  // Remove the incorrect genre nullification
  const requestParams = {
    page: params.page,
    size: params.size,
    title: params.title,
    genre: params.genre, // Don't override genre based on isAnimeTab
    status: params.status,
    type: params.type,
  };

  // Clean up undefined/null values
  const cleanParams = Object.fromEntries(
    Object.entries(requestParams).filter(([_, value]) => value !== undefined && value !== null),
  );

  console.log('API 요청 파라미터:', cleanParams);
  console.log('장르:', params.genre);
  console.log('애니메이션 탭 여부:', params.isAnimeTab);

  try {
    const response = await instance.get<EventsResponse>('/events/category', {
      params: cleanParams,
    });

    if (response.data.isSuccess && response.data.result) {
      console.log(`받은 이벤트 수: ${response.data.result.events.length}`);
      console.log('장르별 필터링 적용됨:', params.genre);
    }

    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
};
