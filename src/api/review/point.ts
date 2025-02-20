// api/review/point.ts

import instance from '@/api/axios';
import { PointBalanceResponse } from '@/types/review/point';

export const getPointBalance = () => {
  return instance
    .get<PointBalanceResponse>('/api/points/balance')
    .then((response) => response.data);
};
