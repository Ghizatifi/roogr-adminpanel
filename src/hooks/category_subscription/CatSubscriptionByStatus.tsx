import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { CategorySubscription } from '../../types/CategorySubscription';

interface UseCategorySubscriptionsByStatusReturn {
  data: CategorySubscription[] | null;
  loading: boolean;
  error: string | null;
  refreshRequest: any;
}

const useCategorySubscriptionsByStatus = (
  status: string,
  currentPage: number,
  query?: string,
): UseCategorySubscriptionsByStatusReturn => {
  const [data, setData] = useState<CategorySubscription[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchCategorySubscriptionsByStatus = async () => {
    try {
      const response = await axiosInstance.get(
        `/category_subscription/status/${status}?page=${currentPage}&limit=8`,
        {
          params: {
            q: query || '',
          },
        },
      );
      setData(response.data.data);
      // console.log(response.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategorySubscriptionsByStatus();
  }, [status, currentPage, query]);
  const refreshRequest = () => {
    fetchCategorySubscriptionsByStatus();
  };
  return { data, loading, error, refreshRequest };
};

export default useCategorySubscriptionsByStatus;
