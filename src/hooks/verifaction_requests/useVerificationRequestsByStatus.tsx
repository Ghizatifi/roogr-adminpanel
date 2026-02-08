import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
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

const useVerificationRequestsByStatus = (
  status: string,
  currentPage: number = 0,
  query?: string,
  limit: number = 8,
): UseVerificationRequestsByStatusReturn => {
  const [data, setData] = useState<VerificationRequest[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchVerificationRequestsByStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<VerificationRequestResponse>(
        `/verification_request/status/${status}?page=${currentPage}&limit=${limit}`,
        {
          params: {
            q: query || '',
          },
        },
      );
      if (response.data.success) {
        setData(response.data.data);
        // console.log(response.data);
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
    fetchVerificationRequestsByStatus();
  }, [status, currentPage, limit, query]);
  const refreshRequest = () => {
    fetchVerificationRequestsByStatus();
  };
  return { data, loading, error, refreshRequest };
};

export default useVerificationRequestsByStatus;
