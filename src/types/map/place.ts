import { HashTag } from './route';

interface Animation {
  animationId: number;
  animationName: string;
  isLiked: boolean;
  hashTags: HashTag[];
}

export interface Place {
  id: number;
  title: string;
  name: string;
  isSelected: boolean;
  latitude: number;
  longitude: number;
  animeName: string;
  address: string;
  hashtags: string[];
  isLiked: boolean;
  selectedAnimation: Animation;
}

// Event 타입도 정의
// export interface Event {
//   eventId: number;
//   name: string;
//   isLiked: boolean;
//   animationTitle: string;
//   latitude: number;
//   longitude: number;
//   hashTags: HashTag[];
// }

export interface Event {
  eventId: number;
  name: string;
  isLiked: boolean;
  animationTitle: string;
  latitude: number;
  longitude: number;
  hashTags: HashTag[];
  // 필요한 경우 originalData 타입 추가
  originalData?: any; // 또는 더 구체적인 타입 지정
}
