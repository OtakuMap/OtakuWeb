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
  useOldApi?: boolean; // 이전 API 사용 여부를 선택할 수 있는 옵션 추가
}

export const useLike = ({
  initialIsLiked,
  id,
  type,
  animationId,
  useOldApi = false,
}: UseLikeProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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
        // place 관련 로직
        if (!animationId && !isLiked) {
          console.error('animationId is required for adding place like');
          return;
        }

        if (isLiked) {
          if (useOldApi) {
            await likesAPI.removePlaceLike(id);
          } else {
            // animationId가 필요한 새로운 API 사용
            if (!animationId) {
              console.error('animationId is required for removing place like with new API');
              return;
            }
            await likesAPI.removePlaceLikeWithAnimation(id, animationId);
          }
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
