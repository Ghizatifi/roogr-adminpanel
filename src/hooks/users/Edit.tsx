import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { User } from '../../types/user';

const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editUser = async (id: string, updatedData: User) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/users/${id}`, updatedData);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  return { editUser, loading, error };
};

export default useEditUser;
