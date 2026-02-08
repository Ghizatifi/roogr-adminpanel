import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useBannedChats = () => {
  const [bannedChats, setBannedChats] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchBannedChats = async () => {
    try {
      const response = await axiosInstance.get('/chats/status/banned');
      if (response.data.success) {
        setBannedChats(response.data.data);
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
    fetchBannedChats();
  }, []);
  const refreshBannedChats = () => {
    fetchBannedChats();
  };
  return { bannedChats, loading, error, refreshBannedChats };
};

export default useBannedChats;
