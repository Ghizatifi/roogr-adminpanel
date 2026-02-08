import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { useParams } from 'react-router-dom';
import { CategorySubscription } from '../../types/CategorySubscription';

interface UseCategorySubscriptionsByStatusReturn {
  data: CategorySubscription[] | null;
  loading: boolean;
  error: string | null;
  refreshRequest: any;
}

const CategorySubscriptionsByUserid = (
  status: string,
): UseCategorySubscriptionsByStatusReturn => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<CategorySubscription[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchCategorySubscriptionsByUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/category_subscription/users/${id}/status/${status}`,
      );
      setData(response.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id && status) {
      fetchCategorySubscriptionsByUser();
    }
  }, [id, status]);

  const refreshRequest = () => {
    fetchCategorySubscriptionsByUser();
  };
  return { data, loading, error, refreshRequest };
};

export default CategorySubscriptionsByUserid;
