export interface RouteLocation {
  id: number;
  name: string;
  isSelected: boolean;
  latitude: number;
  longitude: number;
  animeName: string;
  address: string;
  hashtags: string[];
}

export interface RouteData {
  title: string;
  description: string;
  locations: RouteLocation[];
}

export interface LocationDetail {
  id: number;
  name: string;
  isSelected: boolean;
  latitude: number;
  longitude: number;
  animeName: string;
  address: string;
  hashtags: string[];
  relatedPlaces?: LocationDetail[];
}
