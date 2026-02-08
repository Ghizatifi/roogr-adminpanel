import { useState, useCallback } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const useToggleReportStatus = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Record<number, number>>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const toggleStatus = useCallback(
    async (type: string, id: number) => {
      setLoading(true);
      setIsSuccess(false);

      try {
        const currentStatus = status[id] ?? 0;
        const newStatus = currentStatus === 1 ? 0 : 1;

        const response = await axiosInstance.patch(
          `/reports/type/${type}/${id}`,
          { status: newStatus },
        );

        if (response.data.success) {
          toast.success(t('toast.updated'));
          setStatus((prev) => ({
            ...prev,
            [id]: newStatus,
          }));
          setIsSuccess(true);
          setError(null);
        } else {
          throw new Error(response.data.message || 'Failed to update status');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast.error(t('toast.error'));
      } finally {
        setLoading(false);
      }
    },
    [status],
  );

  return { loading, error, status, isSuccess, toggleStatus, setIsSuccess };
};

export default useToggleReportStatus;
