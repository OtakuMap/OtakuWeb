import { RouteLocation, HashTag } from './route';

// 장소와 이벤트의 공통 인터페이스
export interface BaseLocationData extends RouteLocation {
  address?: string;
  isLiked?: boolean;
}

// 장소 타입
export interface PlaceLocationData extends BaseLocationData {
  type: 'place';
  isFavorite: boolean;
  animationListDTO?: {
    placeAnimations: Array<{
      placeAnimationId: number;
      animationId: number;
      animationName: string;
    }>;
    listSize: number;
  };
}

// 이벤트 타입
export interface EventLocationData extends BaseLocationData {
  type: 'event';
  animationTitle: string;
}

export type LocationEventData = PlaceLocationData | EventLocationData;
