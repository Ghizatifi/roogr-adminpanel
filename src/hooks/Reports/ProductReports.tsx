import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { ReportData } from '../../types/ReportData';

// Define the data structure for the response

interface ApiResponse {
  success: boolean;
  message: string;
  data: ReportData[];
}

// Custom Hook with parameters for type and status
export const useProductReports = (
  type: string,
  status: number,
  query?: string,
  // refreshReports: () => void,
) => {
  const [data, setData] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/reports/type/${type}/status/${status}`,
        {
          params: {
            q: query || '',
          },
        },
      );

      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError('Failed to fetch reports');
      }
    } catch (err) {
      setError('An error occurred while fetching the data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReports();
  }, [type, status, query]);
  const refreshReports = () => {
    fetchReports();
  };
  return { data, loading, error, refreshReports };
};
