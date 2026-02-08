import { useState, useEffect } from 'react';
import { User } from '../../types/user';
import axiosInstance from '../../axiosConfig/instanc';

interface UseUserResponse {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshProfile: any;
}

const useUser = (id: number): UseUserResponse => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/users/${id}`);
      const { success, data } = response.data;
      if (success) {
        setUser(data);
      } else {
        setError('Failed to fetch user data');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [id]);
  const refreshProfile = () => {
    fetchUser();
  };
  return { user, loading, error, refreshProfile };
};

export default useUser;
