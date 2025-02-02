import instance from '@/api/axios';
import type { ReportEventRequest, ReportEventResponse } from '@/types/userInfo/report-event';
import axios, { AxiosError } from 'axios';

export const reportEvent = async (data: ReportEventRequest) => {
  try {
    // 요청 데이터가 API 명세서와 정확히 일치하는지 확인
    const requestData = {
      event_name: data.event_name,
      animation_name: data.animation_name,
      additional_info: data.additional_info,
    };

    const response = await instance.post<ReportEventResponse>('/users/report-event', requestData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        // 서버에서 반환한 에러 메시지가 있다면 그것을 사용
        const errorMessage = axiosError.response.data?.message || '이벤트 제보에 실패했습니다.';
        console.error('서버 응답:', axiosError.response.data); // 디버깅을 위한 로그
        throw new Error(errorMessage);
      } else if (axiosError.request) {
        throw new Error('서버로부터 응답을 받지 못했습니다.');
      }
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
