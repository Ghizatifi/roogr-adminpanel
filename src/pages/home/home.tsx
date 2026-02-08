import { useEffect, useState } from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import useLogs from '../../hooks/getLogs';
import MainTable from '../../components/lastnews/MainTable';
import useChartData from '../../hooks/useChartData';
import { MdOutlineWatchLater } from 'react-icons/md';
import { LuCalendarDays } from 'react-icons/lu';
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi2';
import { TbChartDonut } from 'react-icons/tb';
import Pagination from '../../components/pagination/Pagination';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Charts = () => {
  const nameClass =
    'font-medium text-[#0E1FB2] dark:text-[#70F1EB] hover:underline cursor-pointer';
  const colorEvenClass =
    'text-[16px] sm:text-[18px] font-[500] text-[#19930E] dark:text-[#32E26B]';
  const colorOddClass =
    'text-[16px] sm:text-[18px] font-[500] text-[#A130BE] dark:text-[#C084FC]';
  const TypeClass = 'text-body dark:text-bodydark1';
  const timeClass = 'flex items-center gap-2 text-body dark:text-bodydark1';
  const iconClass = 'shrink-0 text-lg';
  const [currentPage, setCurrentPage] = useState(0);
  const [logsCount, setLogsCount] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchLogsCount = async () => {
      try {
        const response = await axiosInstance.get(`/logs/count`);
        setLogsCount(response.data.data.count / 8);
      } catch (err) {}
    };
    fetchLogsCount();
  }, []);

  const { logs } = useLogs(currentPage);
  const totalPages = Math.ceil(logsCount);
  const { customerChartData, advertiserChartData, loading, error } =
    useChartData();

  const handleClickName = (customerId: number) => {
    navigate(`/profile/${customerId}`);
  };

  const getFirstNameFromLog = (log: any) => {
    try {
      const data =
        typeof log.data === 'string' ? JSON.parse(log.data) : log.data;
      const name = typeof data?.name === 'string' ? data.name : '';
      if (!name.trim()) return '—';
      return name.trim().split(/\s+/)[0];
    } catch {
      return '—';
    }
  };

  const dynamicColumns = logs.map((log, index) => {
    const logType =
      log.type === 1 ? t('charts.customer') : t('charts.advertiser');
    return {
      customer_activity_id: log.customer_activity_id,
      columns: [
        {
          key: `name-${log.customer_activity_id}`,
          content: (
            <span
              onClick={() => handleClickName(log.customer_id)}
              className={nameClass}
            >
              {getFirstNameFromLog(log)}
            </span>
          ),
          className: nameClass,
        },
        {
          key: `key-${log.customer_activity_id}`,
          content:
            log.key === 'login'
              ? t('lastNews.lastLogin')
              : log.key === 'register'
                ? t('lastNews.register')
                : t('lastNews.edit'),
          className: index % 2 === 0 ? colorEvenClass : colorOddClass,
        },
        {
          key: `type-${log.customer_activity_id}`,
          content: logType,
          className: TypeClass,
        },
        {
          key: `date_added-${log.customer_activity_id}`,
          content: log.date_added,
          className: timeClass,
          isIcon: true,
          iconClass: iconClass,
          IconComponent: MdOutlineWatchLater,
        },
      ],
    };
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <Breadcrumb pageName={t('sidebar.charts')} breadcrumbLinks={[]} />
        <div className="rounded-2xl border border-stroke bg-white p-8 dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-body dark:text-bodydark">
              {t('charts.loading') || 'Chargement...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !customerChartData || !advertiserChartData) {
    return (
      <div className="space-y-6">
        <Breadcrumb pageName={t('sidebar.charts')} breadcrumbLinks={[]} />
        <div className="rounded-2xl border border-stroke bg-white p-8 dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <p className="text-xl font-medium text-body dark:text-bodydark">
              {error ||
                (t('charts.noData') || 'Aucune donnée disponible')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalUsers =
    (customerChartData?.total ?? 0) + (advertiserChartData?.total ?? 0);
  const totalActive =
    (customerChartData?.statesData?.find((s) => s.label === 'Active')
      ?.count ?? 0) +
    (advertiserChartData?.statesData?.find((s) => s.label === 'Active')
      ?.count ?? 0);
  const activeRatePercent =
    totalUsers > 0 ? Math.round((totalActive / totalUsers) * 100) : 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      <Breadcrumb pageName={t('sidebar.charts')} breadcrumbLinks={[]} />

      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#022e47] via-[#034a6e] to-[#05668d] dark:from-[#0a1628] dark:via-[#0d2137] dark:to-[#0f2847] px-6 py-8 shadow-xl sm:px-8 sm:py-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t('charts.dashboard')}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
              {t('charts.subtitle')}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm">
            <TbChartDonut className="h-6 w-6 text-[#70F1EB]" />
            <span className="text-sm font-medium text-white">
              {t('charts.totalUsers')}: {totalUsers}
            </span>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="group rounded-xl border border-stroke bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-[#70F1EB]/10 dark:text-[#70F1EB]">
              <HiOutlineUserGroup className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-black dark:text-white">
              {customerChartData.total}
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-body dark:text-bodydark">
            {t('charts.customers')}
          </p>
          <p className="mt-0.5 text-xs text-body dark:text-bodydark">
            {customerChartData.total > 0
              ? `${Math.round(
                  ((customerChartData.statesData.find((s) => s.label === 'Active')
                    ?.count ?? 0) /
                    customerChartData.total) *
                    100
                )}% active`
              : '—'}
          </p>
        </div>

        <div className="group rounded-xl border border-stroke bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#019CF6]/10 text-[#019CF6] dark:bg-[#019CF6]/20">
              <HiOutlineUsers className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-black dark:text-white">
              {advertiserChartData.total}
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-body dark:text-bodydark">
            {t('charts.advertisers')}
          </p>
          <p className="mt-0.5 text-xs text-body dark:text-bodydark">
            {advertiserChartData.total > 0
              ? `${Math.round(
                  ((advertiserChartData.statesData.find(
                    (s) => s.label === 'Active'
                  )?.count ?? 0) /
                    advertiserChartData.total) *
                    100
                )}% active`
              : '—'}
          </p>
        </div>

        <div className="group rounded-xl border border-stroke bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#5FDD54]/10 text-[#19930E] dark:bg-[#32E26B]/10 dark:text-[#32E26B]">
              <span className="text-xl font-bold">
                {totalUsers > 0 ? activeRatePercent : 0}%
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm font-medium text-body dark:text-bodydark">
            {t('charts.activeRate')}
          </p>
          <p className="mt-0.5 text-xs text-body dark:text-bodydark">
            {totalActive} / {totalUsers} users
          </p>
        </div>

        <div className="group rounded-xl border border-stroke bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-meta-5/10 text-meta-5">
              <TbChartDonut className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-black dark:text-white">
              {totalUsers}
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-body dark:text-bodydark">
            {t('charts.totalUsers')}
          </p>
          <p className="mt-0.5 text-xs text-body dark:text-bodydark">
            Customers + Advertisers
          </p>
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartThree
          series={customerChartData.series}
          labels={customerChartData.labels}
          statesData={customerChartData.statesData}
          title={t('charts.customers')}
          total={customerChartData.total}
        />
        <ChartThree
          series={advertiserChartData.series}
          labels={advertiserChartData.labels}
          statesData={advertiserChartData.statesData}
          title={t('charts.advertisers')}
          total={advertiserChartData.total}
        />
      </div>

      {/* Recent activity */}
      <div className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke bg-gray/30 px-5 py-4 dark:border-strokedark dark:bg-meta-4/30 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-[#70F1EB]/10 dark:text-[#70F1EB]">
              <LuCalendarDays className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
                {t('lastNews.title')}
              </h2>
              <p className="text-xs text-body dark:text-bodydark">
                {t('lastNews.subtitle')}
              </p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <MainTable logs={dynamicColumns} />
        </div>
        {totalPages > 1 && (
          <div className="border-t border-stroke px-4 py-3 dark:border-strokedark sm:px-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
