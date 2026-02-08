import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useUnBanChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const unbanChat = async (chatId: number, reason: string) => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axiosInstance.patch(`/chats/${chatId}`, {
        key: reason,
      });
      setIsSuccess(true);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to ban user with ID: ${chatId}`);
      }
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { unbanChat, loading, error, isSuccess };
};

export default useUnBanChat;
