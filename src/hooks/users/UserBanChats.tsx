import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useChatUserHistory = (userId: number) => {
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChatHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/chats/user-id/${userId}/history`,
      );

      if (response.data.success) {
        setChatHistory(response.data.data);
        setError(null);
      } else {
        throw new Error(
          response.data.message || 'Failed to fetch chat history',
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  const refreshChatHistory = () => {
    fetchChatHistory();
  };

  return { chatHistory, loading, error, refreshChatHistory };
};

export default useChatUserHistory;
