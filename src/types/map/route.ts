export interface RouteLocation {
    id: number;
    name: string;
    isSelected: boolean;
  }
  
  export interface RouteData {
    title: string;
    description: string;
    locations: RouteLocation[];
  }