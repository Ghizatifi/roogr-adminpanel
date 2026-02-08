import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { CategorySubscription } from '../../types/CategorySubscription';

interface UseCategorySubscriptionsReturn {
  data: CategorySubscription[] | null;
  loading: boolean;
  error: string | null;
}

const useCategorySubscriptions = (): UseCategorySubscriptionsReturn => {
  const [data, setData] = useState<CategorySubscription[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorySubscriptions = async () => {
      try {
        const response = await axiosInstance.get(
          `/category_subscription?page=0&limit=8&q=3`,
        );
        setData(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCategorySubscriptions();
  }, []);

  return { data, loading, error };
};

export default useCategorySubscriptions;
