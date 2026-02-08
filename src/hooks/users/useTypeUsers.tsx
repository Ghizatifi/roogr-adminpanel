import { useEffect, useState } from 'react';
import { User } from './../../types/user';
import axiosInstance from '../../axiosConfig/instanc';

interface ApiResponse {
  success: boolean;
  message: string;
  data: User[];
}

const useFetchUsers = (
  type: 'customer' | 'advertiser',
  page: number = 0,
  limit: number = 8,
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [usersCount, setUsersCount] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/users/type/${type}?page=${page}&limit=${limit}`,
      );
      // if (response.data.success) {
        console.log(response.data.data);
        
        setUsers(response.data.data);
        const getUsersCount = await axiosInstance.get<ApiResponse>(
          `/users/type/${type}/count`,
        );
        setUsersCount(getUsersCount.data.data.count);
      // } else {
      //   setError(response.data.message || 'Error fetching users');
      // }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [type, page, limit]);

  const refreshUserType = () => {
    fetchUsers();
  };

  return { users, loading, error, refreshUserType, usersCount };
};

export default useFetchUsers;
