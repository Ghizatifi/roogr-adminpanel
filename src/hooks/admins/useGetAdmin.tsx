import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

export interface AdminProfileData {
  id: number;
  email: string;
  phone: string | null;
  first_name: string;
  last_name: string;
  group_id: string;
  date_added?: string;
  last_login?: string | null;
  last_logout?: string | null;
  status?: number;
  is_banned?: number;
  start_working_hour: string | null;
  finish_working_hour: string | null;
  permissions?: string | string[];
}

interface UseGetAdminReturn {
  admin: AdminProfileData | null;
  loading: boolean;
  error: string | null;
  refreshAdmin: () => void;
}

const useGetAdmin = (adminId: number | null): UseGetAdminReturn => {
  const [admin, setAdmin] = useState<AdminProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdmin = async () => {
    if (adminId == null) {
      setAdmin(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/admins/${adminId}`);
      const data = response.data?.data;
      if (response.data?.success && data) {
        setAdmin({
          id: data.id,
          email: data.email ?? '',
          phone: data.phone ?? null,
          first_name: data.first_name ?? '',
          last_name: data.last_name ?? '',
          group_id: data.group_id ?? '',
          date_added: data.date_added,
          last_login: data.last_login,
          last_logout: data.last_logout,
          status: data.status,
          is_banned: data.is_banned,
          start_working_hour: data.start_working_hour ?? null,
          finish_working_hour: data.finish_working_hour ?? null,
          permissions: data.permissions,
        });
      } else {
        setError('Failed to load admin');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load admin');
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, [adminId]);

  return { admin, loading, error, refreshAdmin: fetchAdmin };
};

export default useGetAdmin;
