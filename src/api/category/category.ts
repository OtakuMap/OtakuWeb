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
  // 백엔드 API가 기대하는 형식으로 직접 값 전송
  // Genre[params.genre] 대신 params.genre 값 자체를 사용
  const convertedParams = {
    page: params.page,
    size: params.size,
    title: params.title,
    // 열거형 값을 직접 사용
    genre: params.genre,
    status: params.status,
    type: params.type,
  };

  // undefined 값 제거
  const cleanParams = Object.fromEntries(
    Object.entries(convertedParams).filter(([_, value]) => value !== undefined),
  );

  console.log('API 요청 파라미터 (직접 전달):', cleanParams);
  console.log('원본 타입 값:', params.type);

  try {
    const response = await instance.get<EventsResponse>('/events/category', {
      params: cleanParams,
    });

    console.log('API 응답 상태:', response.status);
    console.log('API 응답 성공 여부:', response.data.isSuccess);

    if (response.data.isSuccess && response.data.result) {
      const eventsCount = response.data.result.events.length;
      console.log(`API 응답 이벤트 수: ${eventsCount}`);

      // 이벤트 타입 분포 확인
      const typeCounts = {};
      response.data.result.events.forEach((event) => {
        if (event.type) {
          typeCounts[event.type] = (typeCounts[event.type] || 0) + 1;
        }
      });
      console.log('이벤트 타입 분포:', typeCounts);

      // 이벤트 샘플 데이터 출력
      if (eventsCount > 0) {
        console.log('첫 번째 이벤트:', {
          id: response.data.result.events[0].id,
          title: response.data.result.events[0].title,
          type: response.data.result.events[0].type,
          status: response.data.result.events[0].status,
        });

        if (eventsCount > 1) {
          console.log('두 번째 이벤트:', {
            id: response.data.result.events[1].id,
            title: response.data.result.events[1].title,
            type: response.data.result.events[1].type,
            status: response.data.result.events[1].status,
          });
        }
      }

      console.log('요청 필터 정보:', {
        요청_타입: params.type,
        필터링된_이벤트수: eventsCount,
      });
    } else {
      console.log('API 응답 오류 메시지:', response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    if (error.response) {
      console.error('서버 응답:', error.response.data);
    }
    throw error;
  }
};
