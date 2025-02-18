import instance from '../axios';
import { ReportEventRequest, ReportEventResponse } from '../../types/userInfo/report-event';

export const reportEvent = async (data: ReportEventRequest): Promise<ReportEventResponse> => {
  try {
    const response = await instance.post<ReportEventResponse>('/users/report-event', {
      eventName: data.eventName,
      animationName: data.animationName,
      additionalInfo: data.additionalInfo,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
