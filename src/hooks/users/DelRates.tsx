import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';

interface UseDeleteRatesReturn {
  deleteRates: (userId: number, rateIds: number[]) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const useDeleteRates = (): UseDeleteRatesReturn => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const deleteRates = async (
    userId: number,
    rateIds: number[],
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const queryParams = rateIds.map((id) => `rates[]=${id}`).join('&');
    const url = `/users/${userId}/rates/delete?${queryParams}`;

    try {
      const response = await axiosInstance.delete(url);
      if (response.status === 204) {
        toast.success(t('toast.deleted'));
        setIsSuccess(true);
      } else {
        throw new Error('Failed to delete rates');
      }
    } catch (err) {
      toast.error(t('toast.error'));

      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteRates, isLoading, error, isSuccess };
};

export default useDeleteRates;
