import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';

interface UseDeleteFollowersReturn {
  deleteFollowers: (userId: number, followersIds: number[]) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const useDeleteFollowers = (): UseDeleteFollowersReturn => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const deleteFollowers = async (
    userId: number,
    followersIds: number[],
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const queryParams = followersIds.map((id) => `followers[]=${id}`).join('&');
    const url = `/users/${userId}/followers-delete?${queryParams}`;

    try {
      const response = await axiosInstance.delete(url);
      if (response.status === 204) {
        toast.success(t('toast.deleted'));
        setIsSuccess(true);
      } else {
        throw new Error('Failed to delete followers');
      }
    } catch (err: any) {
      toast.error(t('toast.error'));
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteFollowers, isLoading, error, isSuccess };
};

export default useDeleteFollowers;
