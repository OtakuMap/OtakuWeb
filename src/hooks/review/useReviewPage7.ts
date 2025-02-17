import { useState, useRef, useEffect } from 'react';

export interface RouteItem {
  id: number;
  value: string;
}

export interface ReviewFormData {
  title: string;
  content: string;
  selectedReviewType: string;
  selectedAnimation: string;
  selectedVisibility: string;
  routes: string[];
}

export interface UseReviewPageParams {
  initialProfileData: {
    name: string;
    date: string;
  };
}

//주소를 위해
export interface Location {
  latitude: number;
  longitude: number;
  name: string;
  order: number;
}

export const useReviewPage = ({ initialProfileData }: UseReviewPageParams) => {
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedReviewType, setSelectedReviewType] = useState('후기 종류 선택');
  const [selectedAnimation, setSelectedAnimation] =
    useState('어떤 애니메이션과 관련된 후기인가요?');
  const [selectedVisibility, setSelectedVisibility] = useState('게시글 열람범위 설정');

  const [profileData, setProfileData] = useState(initialProfileData);

  // Dropdown states
  const [isReviewTypeOpen, setIsReviewTypeOpen] = useState(false);
  const [isAnimationOpen, setIsAnimationOpen] = useState(false);
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);

  // Custom animation states
  const [customAnimation, setCustomAnimation] = useState('');
  const [isTypingCustom, setIsTypingCustom] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Routes state
  const [routes, setRoutes] = useState<RouteItem[]>([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
    { id: 4, value: '' },
    { id: 5, value: '' },
  ]);

  // 위치 관련 상태
  const [locations, setLocations] = useState<Location[]>([]);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  useEffect(() => {
    setProfileData(initialProfileData);
  }, [initialProfileData]);

  // Review Type Handlers
  const toggleReviewType = () => setIsReviewTypeOpen(!isReviewTypeOpen);

  const handleReviewTypeSelect = (type: string) => {
    setSelectedReviewType(type);
    setIsReviewTypeOpen(false);
  };

  // Animation Handlers
  const toggleAnimation = () => {
    setIsAnimationOpen(!isAnimationOpen);
  };

  const handleAnimationSelect = (animation: string) => {
    if (animation === 'custom') {
      setIsTypingCustom(true);
      setIsAnimationOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else {
      setSelectedAnimation(animation);
      setIsAnimationOpen(false);
      setIsTypingCustom(false);
    }
  };

  // Custom Animation Input Handlers
  const handleCustomAnimationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAnimation(e.target.value);
  };

  const handleCustomAnimationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customAnimation.trim()) {
      setSelectedAnimation(customAnimation);
      setIsTypingCustom(false);
      setIsAnimationOpen(false);
    }
  };

  const handleCustomAnimationBlur = () => {
    if (customAnimation.trim()) {
      setSelectedAnimation(customAnimation);
    }
    setIsTypingCustom(false);
    setIsAnimationOpen(false);
  };

  // Input Click Handler
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Visibility Handlers
  const toggleVisibility = () => setIsVisibilityOpen(!isVisibilityOpen);

  const handleVisibilitySelect = (visibility: string) => {
    setSelectedVisibility(visibility);
    setIsVisibilityOpen(false);
  };

  // 위치 관련 핸들러
  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    const newLocation = {
      latitude: location.lat,
      longitude: location.lng,
      name: '',
      order: locations.length + 1,
    };
    setLocations([...locations, newLocation]);
  };

  const handleLocationNameChange = (order: number, newName: string) => {
    setLocations(locations.map((loc) => (loc.order === order ? { ...loc, name: newName } : loc)));
  };

  const deleteLocation = (order: number) => {
    const updatedLocations = locations
      .filter((loc) => loc.order !== order)
      .map((loc, idx) => ({
        ...loc,
        order: idx + 1,
      }));
    setLocations(updatedLocations);
  };

  // Routes Handlers
  const handleRouteChange = (id: number, value: string) => {
    setRoutes(routes.map((route) => (route.id === id ? { ...route, value } : route)));
  };

  const deleteRoute = (idToDelete: number) => {
    setRoutes(
      routes
        .filter((route) => route.id !== idToDelete)
        .map((route, index) => ({
          ...route,
          id: index + 1,
        })),
    );
  };

  // Submit Handler
  // const handleSubmit = () => {
  //   const formData: ReviewFormData = {
  //     title,
  //     content,
  //     selectedReviewType,
  //     selectedAnimation,
  //     selectedVisibility,
  //     routes: routes.filter((route) => route.value).map((route) => route.value),
  //   };

  //   console.log(formData);
  //   return formData;
  // };
  const handleSubmit = () => {
    const formData = {
      title,
      content,
      selectedReviewType,
      selectedAnimation,
      selectedVisibility,
      locations: locations.map(({ name, latitude, longitude, order }) => ({
        name,
        latitude,
        longitude,
        order,
      })),
    };

    console.log('Form data with locations:', formData);
    return formData;
  };

  return {
    profileData,
    // Form State
    title,
    setTitle,
    content,
    setContent,
    selectedReviewType,
    selectedAnimation,
    selectedVisibility,

    // Dropdown States
    isReviewTypeOpen,
    isAnimationOpen,
    isVisibilityOpen,

    // Custom Animation States
    customAnimation,
    isTypingCustom,
    inputRef,

    // Routes
    routes,

    // Handlers
    toggleReviewType,
    handleReviewTypeSelect,
    toggleAnimation,
    handleAnimationSelect,
    handleCustomAnimationInput,
    handleCustomAnimationKeyDown,
    handleCustomAnimationBlur,
    handleInputClick,
    toggleVisibility,
    handleVisibilitySelect,
    handleRouteChange,
    deleteRoute,
    handleSubmit,

    locations,
    isMapModalOpen,
    setIsMapModalOpen,
    handleLocationSelect,
    handleLocationNameChange,
    deleteLocation,
  };
};
