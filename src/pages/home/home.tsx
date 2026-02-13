import { useEffect, useState } from 'react';
import useLogs from '../../hooks/getLogs';
import MainTable from '../../components/lastnews/MainTable';
import useChartData from '../../hooks/useChartData';
import { useDashboardCounts } from '../../hooks/useDashboardCounts';
import { MdOutlineWatchLater } from 'react-icons/md';
import { LuCalendarDays } from 'react-icons/lu';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { TbReceipt } from 'react-icons/tb';
import { IoPersonCircleOutline, IoCameraOutline } from 'react-icons/io5';
import Pagination from '../../components/pagination/Pagination';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SEGMENTS_PER_BAR = 14;

/** Trois barres verticales : une par catégorie, segments remplis depuis le bas, le reste en gris */
function ThreeVerticalBars({
  statesData,
  total,
}: {
  statesData: { label: string; count: number; color: string }[];
  total: number;
}) {
  return (
    <div className="flex gap-1">
      {statesData.map((s, idx) => {
        const filled = total > 0 ? Math.round((s.count / total) * SEGMENTS_PER_BAR) : 0;
        const greyCount = SEGMENTS_PER_BAR - filled;
        return (
          <div key={s.label} className="flex w-4 flex-col gap-0.5 rounded-sm overflow-hidden">
            {Array(greyCount)
              .fill(0)
              .map((_, i) => (
                <div key={`g-${idx}-${i}`} className="h-1.5 w-full bg-gray-200 dark:bg-gray-600 rounded-sm" />
              ))}
            {Array(filled)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`f-${idx}-${i}`}
                  className="h-1.5 w-full rounded-sm"
                  style={{ backgroundColor: s.color }}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
}

const Charts = () => {
  const nameClass =
    'font-medium text-primary hover:underline cursor-pointer dark:text-login-dark';
  const colorEvenClass =
    'text-[16px] sm:text-[18px] font-[500] text-Input-TextGreen dark:text-TextGreen';
  const colorOddClass =
    'text-[16px] sm:text-[18px] font-[500] text-meta-5 dark:text-secondary';
  const TypeClass = 'text-body dark:text-bodydark1';
  const timeClass = 'flex items-center gap-2 text-body dark:text-bodydark1';
  const iconClass = 'shrink-0 text-lg';
  const [currentPage, setCurrentPage] = useState(0);
  const [logsCount, setLogsCount] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { customerChartData, advertiserChartData, loading, error } = useChartData();
  const { counts: dashboardCounts } = useDashboardCounts();

  useEffect(() => {
    const fetchLogsCount = async () => {
      try {
        const response = await axiosInstance.get(`/logs/count`);
        setLogsCount(response.data.data.count / 8);
      } catch {}
    };
    fetchLogsCount();
  }, []);

  const { logs } = useLogs(currentPage);
  const totalPages = Math.ceil(logsCount);

  const handleClickName = (customerId: number) => {
    navigate(`/profile/${customerId}`);
  };

  const getFirstNameFromLog = (log: any) => {
    try {
      const data = typeof log.data === 'string' ? JSON.parse(log.data) : log.data;
      const name = typeof data?.name === 'string' ? data.name : '';
      if (!name.trim()) return '—';
      return name.trim().split(/\s+/)[0];
    } catch {
      return '—';
    }
  };

  const dynamicColumns = logs.map((log, index) => {
    const logType = log.type === 1 ? t('charts.customer') : t('charts.advertiser');
    return {
      customer_activity_id: log.customer_activity_id,
      columns: [
        {
          key: `name-${log.customer_activity_id}`,
          content: (
            <span onClick={() => handleClickName(log.customer_id)} className={nameClass}>
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
        <div className="rounded-2xl border border-stroke bg-white p-8 shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-body dark:text-bodydark">{t('charts.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !customerChartData || !advertiserChartData) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-stroke bg-white p-8 shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <p className="text-xl font-medium text-body dark:text-bodydark">
              {error || t('charts.noData')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const v = dashboardCounts.verification;
  const c = dashboardCounts.category;
  const metricCards = [
    { label: t('charts.cardsVerification'), value: v.processing, icon: TbReceipt, bg: 'bg-meta-5', to: '/confirm/subscription' },
    { label: t('charts.cardsActive'), value: v.approved, icon: TbReceipt, bg: 'bg-Input-TextGreen', to: '/confirm/subscription' },
    { label: t('charts.cardsExpired'), value: v.expired, icon: TbReceipt, bg: 'bg-meta-1', to: '/confirm/subscription' },
    { label: t('charts.cardsRejected'), value: v.rejected, icon: TbReceipt, bg: 'bg-meta-8', to: '/confirm/subscription' },
    { label: t('charts.cardsCategory'), value: c.processing, icon: TbReceipt, bg: 'bg-gray-400', to: '/part/subscription' },
    { label: t('charts.cardsActive'), value: c.approved, icon: TbReceipt, bg: 'bg-Input-TextGreen', to: '/part/subscription' },
    { label: t('charts.cardsExpired'), value: c.expired, icon: TbReceipt, bg: 'bg-meta-1', to: '/part/subscription' },
    { label: t('charts.cardsRejected'), value: c.rejected, icon: TbReceipt, bg: 'bg-meta-6', to: '/part/subscription' },
  ];

  const firstName = localStorage.getItem('first_name') || 'ROOGR';

  return (
    <div className="min-h-full bg-gray-100 dark:bg-primaryBG-dark rounded-2xl p-4 md:p-5">
      <div className="space-y-6">
        {/* Top row: 3 cards - Profile, Customers, Advertisers */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Profile card - style image: photo centrée, icône caméra carrée bas-gauche, titre gris + nom en gras, lignes avec fond gris */}
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-secondaryBG-dark dark:shadow-none">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src="/Defualt.png"
                  alt=""
                  className="h-20 w-20 rounded-full object-cover border-2 border-gray-100 dark:border-white/10"
                />
                <span className="absolute -bottom-0.5 -left-0.5 flex h-6 w-6 items-center justify-center rounded-sm bg-Input-TextGreen text-white shadow">
                  <IoCameraOutline className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-2 text-sm text-center text-gray-500 dark:text-bodydark">
                {t('charts.profileRole')}
              </p>
              <p className="text-center text-lg font-bold uppercase tracking-wide text-black dark:text-white">
                {firstName}
              </p>
              <div className="mt-4 w-full space-y-2">
                {[
                  { count: 1, labelKey: 'charts.delegate' },
                  { count: 5, labelKey: 'charts.supervisor' },
                  { count: 7, labelKey: 'charts.observer' },
                ].map((row) => (
                  <div
                    key={row.labelKey}
                    className="flex w-full items-center justify-between gap-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <HiOutlineUserGroup className="h-4 w-4 shrink-0 text-gray-500 dark:text-bodydark" />
                      <span className="tabular-nums text-sm font-medium text-black dark:text-white">
                        {row.count}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-bodydark">
                      {t(row.labelKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customers card - style image: titre à droite, libellés+(count) à gauche, 3 barres verticales à droite, pill en bas */}
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-secondaryBG-dark dark:shadow-none">
            <h3 className="text-base font-bold text-black dark:text-white text-end">
              {t('charts.customers')}
            </h3>
            <div className="mt-4 flex flex-row gap-4 items-stretch justify-between">
              <div className="order-1 rtl:order-2 flex flex-col gap-2 min-w-0">
                {customerChartData.statesData.map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span className="text-sm font-medium" style={{ color: s.color }}>
                      {t(`charts.${s.label}`)}
                    </span>
                    <span className="text-sm tabular-nums text-black dark:text-white">
                      ( {s.count} )
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-2 rtl:order-1 shrink-0">
                <ThreeVerticalBars
                  statesData={customerChartData.statesData}
                  total={customerChartData.total}
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between gap-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500 px-4 py-3">
                <div className="flex items-center gap-2 shrink-0">
                  {customerChartData.statesData.map((s) => (
                    <span
                      key={s.label}
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 min-w-0 text-end">
                  <span className="text-sm text-black dark:text-white">
                    {t('charts.numberOfCustomers')}
                  </span>
                  <span className="tabular-nums font-bold text-black dark:text-white">
                    {customerChartData.total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Advertisers card - même structure */}
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-secondaryBG-dark dark:shadow-none">
            <h3 className="text-base font-bold text-black dark:text-white text-end">
              {t('charts.advertisers')}
            </h3>
            <div className="mt-4 flex flex-row gap-4 items-stretch justify-between">
              <div className="order-1 rtl:order-2 flex flex-col gap-2 min-w-0">
                {advertiserChartData.statesData.map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span className="text-sm font-medium" style={{ color: s.color }}>
                      {t(`charts.${s.label}`)}
                    </span>
                    <span className="text-sm tabular-nums text-black dark:text-white">
                      ( {s.count} )
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-2 rtl:order-1 shrink-0">
                <ThreeVerticalBars
                  statesData={advertiserChartData.statesData}
                  total={advertiserChartData.total}
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between gap-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500 px-4 py-3">
                <div className="flex items-center gap-2 shrink-0">
                  {advertiserChartData.statesData.map((s) => (
                    <span
                      key={s.label}
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 min-w-0 text-end">
                  <span className="text-sm text-black dark:text-white">
                    {t('charts.numberOfAdvertisers')}
                  </span>
                  <span className="tabular-nums font-bold text-black dark:text-white">
                    {advertiserChartData.total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: 8 cartes - style image: carte blanche, bordure/ombre légère, cercle pastel à droite, titre gris + total en gras à gauche */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {metricCards.map((card, idx) => (
            <Link
              key={idx}
              to={card.to}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 dark:bg-secondaryBG-dark dark:border-white/10 dark:shadow-none transition-shadow hover:shadow-md"
            >
              {/* Titre (gris) + total (gras, gros) à gauche de l’icône */}
              <div className="order-1 rtl:order-2 flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-normal text-gray-500 dark:text-bodydark">
                  {card.label}
                </span>
                <span className="mt-1 text-2xl font-bold text-black dark:text-white tabular-nums sm:text-3xl">
                  {card.value}
                </span>
              </div>
              {/* Cercle plein coloré à droite, icône blanche */}
              <div
                className={`order-2 rtl:order-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white ${card.bg}`}
              >
                <card.icon className="h-7 w-7" />
              </div>
            </Link>
          ))}
        </div>

        {/* Recent activity table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md dark:bg-secondaryBG-dark dark:shadow-none">
          <div className="border-b border-gray-200 bg-gray-50 px-5 py-4 dark:border-strokedark dark:bg-white/5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-login-dark/20 dark:text-login-dark">
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
            <div className="border-t border-gray-200 px-4 py-3 dark:border-strokedark sm:px-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
