import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

interface Admin {
  id: number;
  email: string;
  last_name: string;
  first_name: string;
  status: number;
  date_added: string;
  last_login: string;
  last_logout: string | null;
  phone: string | null;
  is_banned: number;
  group_id: string;
  permissions: string;
  start_working_hour: string | null;
  finish_working_hour: string | null;
}

interface AdminResponse {
  success: boolean;
  message: string;
  data: Admin[];
}

const useAdminsByType = (adminType: number) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchAdminsByType = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<AdminResponse>(
        `/admins/type/${adminType}`,
      );
      if (response.data.success) {
        setAdmins(response.data.data);
      } else {
        setError('Failed to fetch admins');
      }
    } catch (err) {
      setError('Error fetching admins');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAdminsByType();
  }, [adminType]);
  const refreshAdminsByType = () => {
    fetchAdminsByType();
  };
  return { admins, loading, error, refreshAdminsByType };
};

export default useAdminsByType;
