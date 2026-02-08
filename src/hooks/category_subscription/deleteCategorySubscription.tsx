import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../../axiosConfig/instanc';

interface DeleteResponse {
  message: string;
}

interface UseDeleteVerificationRequestResult {
  deleteVerificationRequest: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useDeleteVerificationRequest = (): UseDeleteVerificationRequestResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteVerificationRequest = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.delete<DeleteResponse>(
        `/category_subscription/${id}`,
      );

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { deleteVerificationRequest, loading, error, success };
};

export default useDeleteVerificationRequest;
