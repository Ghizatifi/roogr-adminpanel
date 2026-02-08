import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useGetAdmin from '../../hooks/admins/useGetAdmin';
import { MdBlock } from 'react-icons/md';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

const AdminProfile = () => {
  const { adminId } = useParams<{ adminId: string }>();
  const id = adminId ? Number(adminId) : null;
  const { t } = useTranslation();
  const { admin, loading, error, refreshAdmin } = useGetAdmin(id);

  const groupIdToLabel = (group_id: string) => {
    const map: Record<string, string> = {
      '1': t('admins.delegate'),
      '2': t('admins.observer'),
      '3': t('admins.supervisor'),
    };
    return map[group_id] || group_id;
  };

  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return '—';
    try {
      const d = new Date(`1970-01-01T${timeStr}`);
      return isNaN(d.getTime()) ? timeStr : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return timeStr;
    }
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <>
        <Breadcrumb
          pageName={t('admins.profileTitle') || 'Admin profile'}
          breadcrumbLinks={[{ label: t('admins.label'), path: '/admins' }]}
        />
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent dark:border-[#70F1EB] dark:border-t-transparent" />
        </div>
      </>
    );
  }

  if (error || !admin) {
    return (
      <>
        <Breadcrumb
          pageName={t('admins.profileTitle') || 'Admin profile'}
          breadcrumbLinks={[{ label: t('admins.label'), path: '/admins' }]}
        />
        <div className="rounded-xl border border-stroke bg-white p-8 text-center dark:border-strokedark dark:bg-boxdark">
          <p className="text-body dark:text-bodydark">
            {error || (t('admins.profileNotFound') || 'Admin not found')}
          </p>
          <Link
            to="/admins"
            className="mt-4 inline-block text-primary hover:underline dark:text-[#70F1EB]"
          >
            {t('admins.backToList') || 'Back to list'}
          </Link>
        </div>
      </>
    );
  }

  const fullName = [admin.first_name, admin.last_name].filter(Boolean).join(' ') || '—';
  const isBanned = admin.is_banned === 1;

  return (
    <div className="space-y-4">
      <Breadcrumb
        pageName={`${t('admins.profileTitle') || 'Admin'} #${admin.id}`}
        breadcrumbLinks={[{ label: t('admins.label'), path: '/admins' }]}
      />

      {/* Compact header */}
      <div className="flex flex-col gap-4 rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h1 className="text-lg font-bold text-black dark:text-white sm:text-xl">
            {fullName}
          </h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary dark:bg-[#70F1EB]/20 dark:text-[#70F1EB]">
              {groupIdToLabel(admin.group_id)}
            </span>
            {isBanned ? (
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
        <Link
          to={`/admins/edit-admin/${admin.id}`}
          className="inline-flex items-center gap-2 rounded-lg bg-EditIconBg px-3 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <HiOutlinePencilSquare className="h-4 w-4" />
          {t('admins.edit')}
        </Link>
      </div>

      {/* Overview */}
      <div className="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-strokedark dark:bg-boxdark sm:p-5">
        <h2 className="mb-3 text-base font-semibold text-black dark:text-white">
          {t('profile.overview')}
        </h2>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark">
              {t('admins.adminList.id')}
            </dt>
            <dd className="text-sm font-medium text-black dark:text-white">{admin.id}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark">
              {t('admins.adminList.name')}
            </dt>
            <dd className="text-sm font-medium text-black dark:text-white">{fullName}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark">
              {t('admins.adminList.email')}
            </dt>
            <dd className="break-words text-sm font-medium text-black dark:text-white">
              {admin.email || '—'}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark">
              {t('admins.adminList.phone')}
            </dt>
            <dd className="text-sm font-medium text-black dark:text-white">
              {admin.phone || '—'}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark">
              {t('admins.form.select-type')}
            </dt>
            <dd className="text-sm font-medium text-black dark:text-white">
              {groupIdToLabel(admin.group_id)}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark">
              {t('admins.adminList.dateAdded')}
            </dt>
            <dd className="text-sm font-medium text-black dark:text-white">
              {formatDate(admin.date_added)}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark">
              {t('admins.adminList.start_working_hour')}
            </dt>
            <dd className="text-sm font-medium text-black dark:text-white">
              {formatTime(admin.start_working_hour)}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs font-medium uppercase tracking-wider text-body dark:text-bodydark">
              {t('admins.adminList.finish_working_hour')}
            </dt>
            <dd className="text-sm font-medium text-black dark:text-white">
              {formatTime(admin.finish_working_hour)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default AdminProfile;
