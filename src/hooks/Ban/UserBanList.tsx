import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useBannedUsers = () => {
  const [bannedUsers, setBannedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchBannedUsers = async () => {
    try {
      const response = await axiosInstance.get('/users/banned?page=0');
      if (response.data.success) {
        setBannedUsers(response.data.data.banned);
      } else {
        throw new Error(
          response.data.message || 'Failed to fetch banned chats',
        );
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBannedUsers();
  }, []);
  const refreshBannedUsers = () => {
    fetchBannedUsers();
  };

  return { bannedUsers, loading, error, refreshBannedUsers };
};

export default useBannedUsers;
