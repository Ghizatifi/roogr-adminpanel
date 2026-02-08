import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';

interface UseDeleteAdminsReturn {
  deleteAdmins: (adminIds: number[]) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const useDeleteAdmins = (): UseDeleteAdminsReturn => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const deleteAdmins = async (adminIds: number[]): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const queryParams = adminIds.map((id) => `admins[]=${id}`).join('&');
    const url = `/delete?${queryParams}`;

    try {
      const response = await axiosInstance.delete(url);
      if (response.status === 204) {
        toast.success(t('toast.deleted'));
        setIsSuccess(true);
      } else {
        throw new Error('Failed to delete admins');
      }
    } catch (err) {
      console.error(err);
      toast.error(t('toast.error'));
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAdmins, isLoading, error, isSuccess };
};

export default useDeleteAdmins;
