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
  const handleSubmit = () => {
    const formData: ReviewFormData = {
      title,
      content,
      selectedReviewType,
      selectedAnimation,
      selectedVisibility,
      routes: routes.filter((route) => route.value).map((route) => route.value),
    };

    console.log(formData);
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
  };
};
