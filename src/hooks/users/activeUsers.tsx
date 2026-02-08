import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { User } from '../../types/user';

interface ApiResponse {
  success: boolean;
  message: string;
  data: User[];
}

const useStateUsers = (
  UserType: string,
  state: number,
  currentPage: number = 0,
  limit: number = 8,
  userName: string = '',
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/users/type/${UserType}/state/${state}`,
        {
          params: {
            page: currentPage,
            limit,
            q: userName || '',
          },
        },
      );

      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [UserType, state, currentPage, userName]);

  const refreshUsers = () => {
    fetchUsers();
  };

  return { users, loading, error, refreshUsers };
};

export default useStateUsers;
