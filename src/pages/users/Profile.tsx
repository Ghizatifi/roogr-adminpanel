import { useEffect } from 'react';
import ProfileAccordion from '../../components/users/ProfileAccordion';
import ProfileOverview from '../../components/users/ProfileOverview';
import { useParams } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';
import StarRating from '../../components/users/StarRating';
import ProfileImages from '../../components/users/ProfileImages';
import useUser from '../../hooks/users/useGetUser';
import useBanUser from '../../hooks/users/useBanUser';
import useRemoveUser from '../../hooks/users/useRemoveUser';
import NotfoundUser from '../notfound/NotfoundUser';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { MdBlock, MdOutlineDeleteOutline } from 'react-icons/md';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const { t } = useTranslation();

  const { user, loading, error, refreshProfile } = useUser(userId);
  const { banUser, isSuccess: banSuccess } = useBanUser();
  const { removeUser, success: removeSuccess } = useRemoveUser();
  const { handleAction, loading: actionLoading } = useHandleAction();

  useEffect(() => {
    if (banSuccess || removeSuccess) {
      refreshProfile();
    }
  }, [banSuccess, removeSuccess, refreshProfile]);

  if (loading) {
    return (
      <>
        <Breadcrumb
          pageName={t('profile.pageName') || 'Profile'}
          breadcrumbLinks={[{ label: t('sidebar.users.all') || 'Users', path: '/users' }]}
        />
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent dark:border-[#70F1EB] dark:border-t-transparent" />
        </div>
      </>
    );
  }

  if (error || !user || (user as any).success === false) {
    return <NotfoundUser />;
  }

  const ratingValue = user?.rating != null ? parseFloat(String(user.rating)) : 0;

  return (
    <div className="space-y-4">
      <Breadcrumb
        pageName={`${t('profile.pageName') || 'Profile'} #${user.id}`}
        breadcrumbLinks={[{ label: t('sidebar.users.all') || 'Users', path: '/users' }]}
      />

      {/* Compact profile bar: avatar + identity + rating + actions (no big cover) */}
      <div className="flex flex-col gap-4 rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        <ProfileImages user={user} compact />

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold text-black dark:text-white sm:text-xl">
            {user?.name || '—'}
          </h1>
          <p className="truncate text-sm text-body dark:text-bodydark">
            {user?.alias || '—'}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                user?.type === 'advertiser'
                  ? 'bg-primary/10 text-primary dark:bg-[#70F1EB]/20 dark:text-[#70F1EB]'
                  : 'bg-meta-5/10 text-meta-5'
              }`}
            >
              {user?.type === 'advertiser'
                ? t('profile.userDetials.advertiser')
                : t('profile.userDetials.customer')}
            </span>
            {(user?.isBanned === true || (user as any)?.isBanned === 1) ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-600 dark:text-red-400">
                <MdBlock className="h-3 w-3" />
                {t('Ban.Banned')}
              </span>
            ) : (
              <span className="inline-flex rounded-full bg-Input-borderGreen/20 px-2 py-0.5 text-xs font-medium text-Input-TextGreen dark:bg-[#32E26B]/20 dark:text-[#32E26B]">
                {t('profile.userDetials.Activated')}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <StarRating rating={ratingValue} />
          <span className="text-sm font-medium text-black dark:text-white tabular-nums">
            {ratingValue.toFixed(1)}
          </span>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-stroke pt-3 sm:border-t-0 sm:border-s sm:ps-6 sm:pt-0 dark:border-strokedark">
          <button
            type="button"
            onClick={() =>
              user?.id &&
              handleAction(
                Number(user.id),
                !!(user?.isBanned || (user as any)?.isBanned === 1),
                'ban',
                banUser,
                {
                  confirmButtonClass: 'bg-BlockIconBg',
                  cancelButtonClass: '',
                },
                refreshProfile,
              )
            }
            disabled={!!actionLoading}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-opacity ${
              user?.isBanned ? 'bg-Input-green text-Input-TextGreen' : 'bg-BlockIconBg text-white'
              } ${actionLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
              title={user?.isBanned || (user as any)?.isBanned === 1 ? t('Ban.unBan') : t('Ban.Ban')}
          >
            <MdBlock className="h-4 w-4" />
            {user?.isBanned ? t('Ban.unBan') : t('Ban.Ban')}
          </button>
          <button
            type="button"
            onClick={() =>
              user?.id &&
              handleAction(Number(user.id), false, 'remove', removeUser, {
                confirmButtonClass: 'bg-RemoveIconBg',
                cancelButtonClass: '',
              },
              refreshProfile,
            )}
            disabled={!!actionLoading}
            className={`inline-flex items-center gap-1.5 rounded-lg bg-RemoveIconBg px-3 py-2 text-sm font-medium text-white transition-opacity ${
              actionLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
            title={t('remove.remove')}
          >
            <MdOutlineDeleteOutline className="h-4 w-4" />
            {t('remove.remove')}
          </button>
        </div>
      </div>

      {/* Overview visible tout de suite, sans dropdown */}
      <ProfileOverview user={user} />

      {/* Détails, produits, etc. en accordéons */}
      <ProfileAccordion user={user} loading={loading} error={error} />
    </div>
  );
};

export default Profile;
