import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useBanUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const banUser = async (userId: number, reason: string) => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const response = await axiosInstance.patch(`/users/${userId}`, {
        key: reason,
      });
      setIsSuccess(true);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to ban user with ID: ${userId}`);
      }
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { banUser, loading, error, isSuccess };
};

export default useBanUser;
