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
  // 애니메이션 탭이면 genre를 null로 설정
  const genreParam = params.isAnimeTab ? null : params.genre;

  // API 요청 파라미터 구성
  const requestParams = {
    page: params.page,
    size: params.size,
    title: params.title,
    // 열거형 값은 그대로 전달 (이미 문자열임)
    genre: genreParam,
    status: params.status,
    type: params.type,
  };

  // undefined나 null 값 제거
  const cleanParams = Object.fromEntries(
    Object.entries(requestParams).filter(([_, value]) => value !== undefined && value !== null),
  );

  console.log('API 요청 파라미터:', cleanParams);
  console.log('장르 값:', params.genre, '-> 애니메이션 탭 여부:', params.isAnimeTab);

  try {
    const response = await instance.get<EventsResponse>('/events/category', {
      params: cleanParams,
    });

    console.log('API 응답 상태:', response.status);
    console.log('API 응답 성공 여부:', response.data.isSuccess);

    if (response.data.isSuccess && response.data.result) {
      console.log(`API 응답 이벤트 수: ${response.data.result.events.length}`);

      // 필요한 추가 로깅 코드...
    }

    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
};
