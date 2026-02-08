import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { useParams } from 'react-router-dom';
import { VerificationRequest } from '../../types/VerificationRequest';

interface VerificationRequestResponse {
  success: boolean;
  message: string;
  data: VerificationRequest[];
}

interface UseVerificationRequestsByStatusReturn {
  data: VerificationRequest[] | null;
  loading: boolean;
  error: string | null;
  refreshRequest: any;
}

const VerificationRequestsByUserid = (
  status: string,
  currentPage: number = 0,
  limit: number = 8,
): UseVerificationRequestsByStatusReturn => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<VerificationRequest[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchVerificationRequestsByStatus = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await axiosInstance.get<VerificationRequestResponse>(
        `/verification_request/users/${id}/status/${status}?page=${currentPage}&limit=${limit}`,
      );

      // Handle the success response
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id && status) {
      fetchVerificationRequestsByStatus();
    }
  }, [id, status, currentPage, limit]);
  const refreshRequest = () => {
    fetchVerificationRequestsByStatus();
  };
  return { data, loading, error, refreshRequest };
};

export default VerificationRequestsByUserid;
