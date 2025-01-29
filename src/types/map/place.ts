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
  relatedPlaces: Place[];
}
