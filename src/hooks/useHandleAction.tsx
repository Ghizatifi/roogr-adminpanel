import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const useHandleAction = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleAction = async (
    id: number,
    isBanned: boolean,
    actionType: 'ban' | 'remove',
    apiCall: (id: number, reason?: any) => Promise<void>,
    buttonClasses: { confirmButtonClass: string; cancelButtonClass: string },
    onComplete?: () => void,
  ) => {
    let action = actionType === 'ban' ? (isBanned ? 'unban' : 'ban') : 'remove';

    let messageTitle = '';
    let messageText = '';
    let confirmButtonText = '';

    if (actionType === 'ban') {
      if (isBanned) {
        messageTitle = t('Ban.unBanmessageTitle');
        messageText = `${t('Ban.unBanmessageText')} ${id}?`;
        confirmButtonText = t('Ban.confirmUnBanButtonText');
      } else {
        messageTitle = t('Ban.BanmessageTitle');
        messageText = `${t('Ban.BanmessageText')} ${id}?`;
        confirmButtonText = t('Ban.confirmBanButtonText');
      }
    } else if (actionType === 'remove') {
      messageTitle = t('remove.remove');
      messageText = `${t('remove.messageText')}: ${id}? `;
      confirmButtonText = t('remove.RemovemessageTitle');
    }

    const { isConfirmed, value: reason } = await Swal.fire({
      title: messageTitle,
      text: messageText,
      input: actionType === 'ban' ? 'textarea' : undefined,
      inputPlaceholder: actionType === 'ban' ? t('Ban.reason') : undefined,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: t('cancel'),
      customClass: {
        popup:
          'bg-secondaryBG-light dark:bg-secondaryBG-dark shadow-lg rounded-lg p-3',
        title: 'text-xl font-bold dark:text-white text-black',
        input: 'border-Input-border block sm:text-sm border p-2 rounded-md',
        confirmButton: `text-secondaryBG-light dark:text-secondaryBG-dark font-bold py-2 px-4 bg-secondaryBG-dark dark:bg-secondaryBG-light rounded ${buttonClasses.confirmButtonClass}`,
        cancelButton: `text-secondaryBG-light dark:text-secondaryBG-dark font-bold py-2 px-4 bg-secondaryBG-dark dark:bg-secondaryBG-light rounded  ${buttonClasses.cancelButtonClass}`,
      },
    });

    if (!isConfirmed) {
      return;
    }

    try {
      setLoading(true);
      await apiCall(id, reason);

      Swal.fire({
        icon: 'success',
        title: `${
          actionType === 'ban'
            ? isBanned
              ? t('Ban.unBaned')
              : t('Ban.Banned')
            : t('remove.removed')
        } ${t('Successfully')}`,
        text: `${id}  ${
          actionType === 'ban'
            ? isBanned
              ? t('Ban.unBaned')
              : t('Ban.Banned')
            : t('remove.removed')
        }${actionType === 'ban' ? ` ${reason}` : ''}`,
        customClass: {
          popup:
            'bg-secondaryBG-light dark:bg-secondaryBG-dark shadow-lg rounded-lg p-3',
          title: 'text-xl font-bold dark:text-white text-black',
          confirmButton: `text-secondaryBG-light dark:text-secondaryBG-dark font-bold py-2 px-4 bg-secondaryBG-dark dark:bg-secondaryBG-light rounded ${buttonClasses.confirmButtonClass}`,
        },
      });

      // Call the onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `${t('failed')} ${
          actionType === 'ban'
            ? isBanned
              ? t('Ban.unBan')
              : t('Ban.Ban')
            : t('remove.remove')
        } User`,
        text: `Error: ${err instanceof Error ? err.message : t('error')}`,
        customClass: {
          popup: 'bg-white shadow-lg rounded-lg p-6',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleAction, loading };
};

export default useHandleAction;
