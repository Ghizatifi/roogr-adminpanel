import { useState, useEffect } from 'react';
import { Follower } from '../../types/follower';
import axiosInstance from '../../axiosConfig/instanc';

interface FollowersApiResponse {
  success: boolean;
  message: string;
  data: Follower[];
}

interface UseFollowersResult {
  followers: Follower[];
  loading: boolean;
  error: string | null;
  refreshFollowers: any;
}

const useFollowers = (userId: number): UseFollowersResult => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFollowers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<FollowersApiResponse>(
        `/users/${userId}/followers`,
      );
      const { data } = response.data;
      setFollowers(data);
    } catch (err) {
      setError('Failed to fetch followers');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFollowers();
  }, [userId]);
  const refreshFollowers = () => {
    fetchFollowers();
  };
  return { followers, loading, error, refreshFollowers };
};

export default useFollowers;
