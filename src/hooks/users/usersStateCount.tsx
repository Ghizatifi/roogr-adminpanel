import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useUsersStateCount = (UserType: string, state: number) => {
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/type/${UserType}/state/${state}/count`,
        );
        setUsersCount(response.data.data.count);
        // console.log(response.data.data.count);
        // console.log(usersCount);
      } catch (err) {
        console.error('Error fetching users count:', err);
      }
    };

    fetchUsersCount();
  }, [UserType, state]);

  return usersCount;
};

export default useUsersStateCount;
