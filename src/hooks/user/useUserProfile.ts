import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '@/api/user/user';
import { useAppSelector } from '../reduxHooks';
import { setUserProfile, clearUserProfile } from '@/store/slices/userSlice';

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const userProfile = useAppSelector((state) => state.user.profile);

  const fetchUserProfile = async () => {
    if (!isLoggedIn) {
      dispatch(clearUserProfile());
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await getUserProfile();

      if (response.isSuccess) {
        dispatch(setUserProfile(response.result));
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error('Failed to fetch user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    } else {
      dispatch(clearUserProfile());
    }
  }, [isLoggedIn, dispatch]);

  return {
    userProfile,
    isLoading,
    error,
    refetchUserProfile: fetchUserProfile,
  };
};
