export interface HashTag {
  hashTagId: number;
  name: string;
}

export interface Animation {
  animationId: number;
  animationName: string;
  isLiked: boolean;
}

export interface RouteLocation {
  id: number;
  name: string;
  isSelected: boolean;
  latitude: number;
  longitude: number;
  animeName: string;
  hashtags: (string | HashTag)[];
  selectedAnimation?: Animation;
  type: 'place' | 'event';
}

export interface RouteInfo {
  routeName: string;
  animationId: number;
  animationName: string;
}

export interface RouteApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    routeId: number;
    routeName: string;
    animationId: number;
    animationName: string;
    places: {
      id: number;
      name: string;
      latitude: number;
      longitude: number;
    }[];
  };
}

export interface RouteData {
  title: string;
  description: string;
  locations: RouteLocation[];
}

export interface LocationDetail extends RouteLocation {
  address: string;
  relatedPlaces?: LocationDetail[];
}

export interface PlaceLikeDetailResponse {
  placeLikeId: number;
  placeName: string;
  animationName: string;
  lat: number;
  lng: number;
  isFavorite: boolean;
  hashtags: HashTag[];
}

export interface RouteItemRequest {
  name: string;
  placeId: number;
  itemOrder: number;
}

export interface CustomRouteRequest {
  name: string;
  routeItems: {
    name: string;
    placeId: number;
    itemOrder: number;
  }[];
}

export interface UpdateRouteRequest {
  name: string;
  routeId: number;
  routeItems: {
    placeId: number;
    itemOrder: number;
  }[];
}

export interface SaveRouteResponse {
  routeId: number;
  updatedAt: string;
}

export interface RouteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    routeId: number;
    updatedAt: string;
  };
}
