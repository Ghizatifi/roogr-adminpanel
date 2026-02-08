import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useBannedUserProducts = (userId: number) => {
  const [bannedUserProds, setBannedUserProds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBannedProds = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/products/history/${userId}`,
      );

      if (response.data.success) {
        setBannedUserProds(response.data.data);
        setError(null);
      } else {
        throw new Error(
          response.data.message || 'Failed to fetch banned products',
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBannedProds();
  }, [fetchBannedProds]);

  const refreshBannedUserProds = () => {
    fetchBannedProds();
  };

  return { bannedUserProds, loading, error, refreshBannedUserProds };
};

export default useBannedUserProducts;
