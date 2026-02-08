import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useUserBanHistory = (userId: number) => {
  const [banHistory, setBanHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/users/${userId}/history`);

      if (response.data.success) {
        setBanHistory(response.data.data);
        setError(null);
      } else {
        throw new Error(
          response.data.message || 'Failed to fetch user ban history',
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBanHistory();
  }, [fetchBanHistory]);

  const refreshBanHistory = () => {
    fetchBanHistory();
  };

  return { banHistory, loading, error, refreshBanHistory };
};

export default useUserBanHistory;
