import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { useParams } from 'react-router-dom';
import { ReportData } from '../../types/ReportData';

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    chats: ReportData[];
    products: ReportData[];
  };
}

export const useUserReports = (status: number) => {
  const { id } = useParams<{ id: string }>();
  const [chats, setChats] = useState<ReportData[]>([]);
  const [products, setProducts] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/reports/users/${id}/status/${status}`,
      );

      if (response.data.success) {
        setChats(response.data.data.chats);
        setProducts(response.data.data.products);
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
  }, [id, status]);

  const refreshUserReports = () => {
    fetchReports();
  };

  return { chats, products, loading, error, refreshUserReports };
};
