import { useEffect, useState } from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import useLogs from '../../hooks/getLogs';
import MainTable from '../../components/lastnews/MainTable';
import useChartData from '../../hooks/useChartData';
import { MdOutlineWatchLater } from 'react-icons/md';
import { LuCalendarDays } from 'react-icons/lu';
import Pagination from '../../components/pagination/Pagination';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Charts = () => {
  const nameClass = 'font-medium text-[#0E1FB2] dark:text-[#70F1EB] hover:underline cursor-pointer';
  const colorEvenClass = 'text-[16px] sm:text-[18px] font-[500] text-[#19930E] dark:text-[#32E26B]';
  const colorOddClass = 'text-[16px] sm:text-[18px] font-[500] text-[#A130BE] dark:text-[#C084FC]';
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
  const { customerChartData, advertiserChartData, loading, error } = useChartData();

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
            <p className="text-body dark:text-bodydark">{t('charts.loading') || 'Chargement...'}</p>
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
              {error || (t('charts.noData') || 'Aucune donnée disponible')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <Breadcrumb pageName={t('sidebar.charts')} breadcrumbLinks={[]} />

      {/* Welcome / Title block */}
      <div className="rounded-2xl border border-stroke bg-white px-5 py-6 shadow-sm dark:border-strokedark dark:bg-boxdark sm:px-6">
        <h1 className="text-2xl font-semibold text-black dark:text-white sm:text-3xl">
          {t('charts.dashboard') || 'Tableau de bord'}
        </h1>
        <p className="mt-1 text-body dark:text-bodydark">
          {t('charts.subtitle') || 'Vue d’ensemble des utilisateurs et dernières activités.'}
        </p>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
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

      {/* Recent activity card */}
      <div className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke bg-gray/30 px-5 py-4 dark:border-strokedark dark:bg-meta-4/30 sm:px-6">
          <div className="flex items-center gap-2">
            <LuCalendarDays className="text-xl text-primary dark:text-[#70F1EB]" />
            <h2 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
              {t('lastNews.title')}
            </h2>
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
