import { useState, useEffect } from 'react';
import { UserRate } from '../../types/rate';
import axiosInstance from '../../axiosConfig/instanc';

interface UseUserRatesReturn {
  data: UserRate[] | null;
  loading: boolean;
  error: string | null;
  refreshRates: any;
}

const useUserRates = (id: number): UseUserRatesReturn => {
  const [data, setData] = useState<UserRate[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchUserRates = async () => {
    try {
      const response = await axiosInstance.get(`/users/${id}/rates`);
      setData(response.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserRates();
  }, []);
  const refreshRates = () => {
    fetchUserRates();
  };
  return { data, loading, error, refreshRates };
};

export default useUserRates;
