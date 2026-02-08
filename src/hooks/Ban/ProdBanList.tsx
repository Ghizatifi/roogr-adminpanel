import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useBannedProducts = () => {
  const [bannedProds, setBannedProds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBannedProds = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/products/status/banned');
      if (response.data.success) {
        setBannedProds(response.data.data);
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
  }, []);

  useEffect(() => {
    fetchBannedProds();
  }, [fetchBannedProds]);

  // Expose refresh function to manually update banned products list
  const refreshBannedProds = () => {
    fetchBannedProds();
  };

  return { bannedProds, loading, error, refreshBannedProds };
};

export default useBannedProducts;
