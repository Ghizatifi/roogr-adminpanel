import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/instanc';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const useRemoveUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const removeUser = async (userId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.delete(`/users/${userId}`);

      if (
        !response?.status ||
        response.status < 200 ||
        response.status >= 300
      ) {
        throw new Error(t('toast.error_delete', { id: userId }));
      }

      const responseData = response.data;

      if (responseData?.success) {
        setSuccess(true);
        toast.success(t('toast.deleted'));
        navigate('/users'); // Navigate after successful deletion
      } else {
        throw new Error(
          t('toast.api_failed', { message: responseData?.message || '' }),
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t('toast.unknown_error');
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { removeUser, loading, error, success };
};

export default useRemoveUser;
