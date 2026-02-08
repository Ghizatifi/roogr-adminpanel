import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';

const useDeleteReport = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const deleteReport = useCallback(async (type: string, id: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/reports/type/${type}/${id}`,
      );
      if (response.status === 204) {
        toast.success(t('toast.deleted'));
        setIsDeleted(true);
        setError(null);
      }
    } catch (err) {
      setIsDeleted(false);
      toast.error(t('toast.error'));
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const resetDeleteStatus = () => setIsDeleted(false);

  return { loading, error, isDeleted, deleteReport, resetDeleteStatus };
};

export default useDeleteReport;
