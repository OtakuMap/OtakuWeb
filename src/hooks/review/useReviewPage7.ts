import { useState, useRef } from 'react';

export interface RouteItem {
  id: number;
  value: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  name: string;
  order: number;
}

export interface UseReviewPageParams {
  initialProfileData: {
    name: string;
    date: string;
  };
}

export const useReviewPage = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedReviewType, setSelectedReviewType] = useState('후기 종류 선택');
  const [selectedAnimation, setSelectedAnimation] =
    useState('어떤 애니메이션과 관련된 후기인가요?');
  const [selectedVisibility, setSelectedVisibility] = useState('게시글 열람범위 설정');

  // Dropdown states
  const [isReviewTypeOpen, setIsReviewTypeOpen] = useState(false);
  const [isAnimationOpen, setIsAnimationOpen] = useState(false);
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);

  // Custom animation states
  const [customAnimation, setCustomAnimation] = useState('');
  const [isTypingCustom, setIsTypingCustom] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 위치 관련 상태
  const [locations, setLocations] = useState<Location[]>(
    Array.from({ length: 5 }, (_, index) => ({
      order: index + 1,
      name: '',
      latitude: 0,
      longitude: 0,
    })),
  );

  const addLocation = () => {
    if (locations.length < 10) {
      const newOrder = locations.length + 1;
      setLocations([
        ...locations,
        {
          order: newOrder,
          name: '',
          latitude: 0,
          longitude: 0,
        },
      ]);
    } else {
      alert('최대 10개의 장소까지만 추가할 수 있습니다.');
    }
  };

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
  // const handleLocationSelect = (location: { lat: number; lng: number }) => {
  //   const newLocation = {
  //     latitude: location.lat,
  //     longitude: location.lng,
  //     name: '',
  //     order: locations.length + 1,
  //   };
  //   setLocations([...locations, newLocation]);
  // };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    const emptyLocationIndex = locations.findIndex((loc) => !loc.name.trim());

    if (emptyLocationIndex !== -1) {
      const updatedLocations = [...locations];
      updatedLocations[emptyLocationIndex] = {
        ...updatedLocations[emptyLocationIndex],
        latitude: location.lat,
        longitude: location.lng,
      };
      setLocations(updatedLocations);
    } else {
      alert('더 이상 위치를 추가할 수 없습니다.');
    }
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
    handleSubmit,

    // Locations
    locations,
    handleLocationSelect,
    handleLocationNameChange,
    deleteLocation,
    addLocation,
  };
};
