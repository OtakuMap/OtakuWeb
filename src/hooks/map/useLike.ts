import { useState, useEffect } from 'react';
import { likesAPI } from '@/api/map/like';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useDispatch } from 'react-redux';
import { openLoginModal } from '@/store/slices/modalSlice';
import { useQueryClient } from '@tanstack/react-query';

export interface UseLikeProps {
  initialIsLiked: boolean;
  id: number;
  type: 'event' | 'place';
  animationId?: number;
}

export const useLike = ({ initialIsLiked, id, type, animationId }: UseLikeProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // initialIsLiked prop이 변경될 때마다 state 업데이트
  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const toggleLike = async () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);

      if (type === 'event') {
        if (isLiked) {
          await likesAPI.removeEventLike(id);
        } else {
          await likesAPI.addEventLike(id);
        }
        // 이벤트 좋아요 토글 후 popularEvents 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: ['popularEvents'] });
      } else {
        // place 관련 로직 유지
        if (!animationId && !isLiked) {
          console.error('animationId is required for adding place like');
          return;
        }
        if (isLiked) {
          await likesAPI.removePlaceLike(id);
        } else if (animationId) {
          await likesAPI.addPlaceLike(id, animationId);
        }
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    toggleLike,
    isLoading,
  };
};
