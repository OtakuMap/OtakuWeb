import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/user/user';
import { getUserProfile } from '@/api/user/user';
import { useAppSelector } from '../reduxHooks';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const fetchUserProfile = async () => {
    if (!isLoggedIn) {
      setUserProfile(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await getUserProfile();

      if (response.isSuccess) {
        setUserProfile(response.result);
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
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  return {
    userProfile,
    isLoading,
    error,
    refetchUserProfile: fetchUserProfile,
  };
};
