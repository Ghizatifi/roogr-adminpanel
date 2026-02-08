import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../../types/user';

interface ProfileOverviewProps {
  user: User;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ user }) => {
  const { t } = useTranslation();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const rows: { label: string; value: string | number | boolean; key: string }[] = [
    { label: t('profile.userDetials.id'), value: user?.id ?? '—', key: 'id' },
    { label: t('profile.userDetials.name'), value: user?.name ?? '—', key: 'name' },
    { label: t('profile.userDetials.alias'), value: user?.alias ?? '—', key: 'alias' },
    { label: t('profile.userDetials.type'), value: user?.type ?? '—', key: 'type' },
    { label: t('profile.userDetials.email'), value: user?.email ?? '—', key: 'email' },
    { label: t('profile.userDetials.phone'), value: user?.phone ?? '—', key: 'phone' },
    { label: t('profile.userDetials.regDate'), value: formatDate(user?.regDate ?? ''), key: 'regDate' },
    { label: t('profile.userDetials.country'), value: user?.address ?? '—', key: 'address' },
    {
      label: t('profile.userDetials.mobileconfirm'),
      value: user?.isActivated?.account ?? false,
      key: 'account',
    },
    {
      label: t('profile.userDetials.emailleconfirm'),
      value: user?.isActivated?.email ?? false,
      key: 'emailAct',
    },
  ];

  return (
    <div className="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-strokedark dark:bg-boxdark sm:p-5">
      <h2 className="mb-3 text-base font-semibold text-black dark:text-white">
        {t('profile.overview')}
      </h2>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(({ label, value, key }) => (
          <div key={key} className="flex flex-col gap-0.5">
            <dt className="text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark">
              {label}
            </dt>
            <dd className="text-sm font-medium text-black dark:text-white">
              {typeof value === 'boolean' ? (
                <span
                  className={
                    value
                      ? 'text-Input-TextGreen dark:text-[#32E26B]'
                      : 'text-Input-TextRed dark:text-[#FB5454]'
                  }
                >
                  {value ? t('profile.userDetials.Activated') : t('profile.userDetials.Deactivated')}
                </span>
              ) : (
                <span className="break-words">{String(value)}</span>
              )}
            </dd>
          </div>
        ))}
        {user?.isBanned && (
          <div className="col-span-full flex flex-col gap-0.5 rounded-lg bg-red-500/10 p-3 dark:bg-red-500/20">
            <dt className="text-xs font-medium uppercase tracking-wider text-red-600 dark:text-red-400">
              {t('profile.banReason')}
            </dt>
            <dd className="text-sm text-black dark:text-white">
              {user?.ban_reason || '—'}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
};

export default ProfileOverview;
