import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../axiosConfig/instanc';
import { useState } from 'react';
import { NotificationValues } from '../../types/NotificationValue';

const useNotificationSubmit = (closeModal: () => void) => {
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const submitNotification = async (
    values: NotificationValues,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    try {
      setSubmitting(true);
      setIsSuccess(null);
      const formattedDate = new Date(values.date)
        .toLocaleDateString('en-CA')
        .replace(/-/g, '/');

      const {
        title,
        message,
        customers,
        advertisers,
        delegates,
        observers,
        supervisors,
      } = values;

      // Construct payload
      const payload = {
        title,
        message,
        expiry_date: formattedDate,
        customers,
        advertisers,
        admin_group: `${delegates ? '1' : '0'}${observers ? '1' : '0'}${
          supervisors ? '1' : '0'
        }`,
        delegates: delegates ? 1 : 0,
        observers: observers ? 1 : 0,
        supervisors: supervisors ? 1 : 0,
      };

      const res = await axiosInstance.post(`/notifications`, payload);

      toast.success(t('notifications.popup.successfully'));
      closeModal();
      setIsSuccess(true);
    } catch (error: any) {
      console.error(error);
      setIsSuccess(false);
      toast.error(
        error?.response?.data?.message || t('notifications.popup.error'),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return { submitNotification, isSuccess };
};

export default useNotificationSubmit;
