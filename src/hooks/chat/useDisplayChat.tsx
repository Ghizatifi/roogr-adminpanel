import { useEffect, useState } from 'react';
import { ChatValue } from '../../types/ChatValue';
import axiosInstance from '../../axiosConfig/instanc';

export default function useDisplayChat(userId?: string) {
  const [chat, setChat] = useState<ChatValue>();
  const displayChats = async () => {
    try {
      const res = await axiosInstance.get(`/chats/${userId}`);
      setChat(res.data.data);
    } catch (error: any) {
      console.error(error);
    }
  };
  useEffect(() => {
    displayChats();
  }, [userId]);
  return chat;
}
