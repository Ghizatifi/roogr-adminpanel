import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface UpdateVerificationResponse {
  success: boolean;
  message?: string;
}

const useToggleVerification = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const toggleVerificationRequired = async (
    id: number,
    currentVerificationRequired: number,
  ): Promise<UpdateVerificationResponse | null> => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const newVerificationRequired = currentVerificationRequired === 1 ? 0 : 1;

      const response = await axiosInstance.put(
        `/verification_request/${id}`,
        {
          verified: newVerificationRequired,
        },
      );
      toast.success(t('toast.updated'));
      setIsSuccess(true);

      return { success: true, message: response.data.message };
    } catch (err: unknown) {
      setError((err as Error).message);
      toast.error(t('toast.error'));

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { toggleVerificationRequired, loading, error, isSuccess };
};

export default useToggleVerification;
