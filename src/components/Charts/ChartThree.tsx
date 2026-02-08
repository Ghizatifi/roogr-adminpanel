import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ChartThreeProps {
  series: number[];
  labels: string[];
  statesData: { label: string; count: number; color: string; link: string }[];
  title: string;
  total: number;
}

const ChartThree: React.FC<ChartThreeProps> = ({
  series = [],
  labels = [],
  statesData = [],
  title = '',
  total = 0,
}) => {
  const { t } = useTranslation();

  // Quand une seule catégorie a des données, on ajoute des micro-segments pour que
  // le donut affiche plusieurs arcs (au lieu d’un cercle plein), plus lisible.
  const nonZeroCount = series.filter((v) => v > 0).length;
  const displaySeries =
    nonZeroCount <= 1 && total > 0
      ? series.map((v) => (v > 0 ? v - 0.002 : 0.001))
      : series;

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Cairo, sans-serif',
      type: 'donut',
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    colors: statesData.map((state) => state.color),
    labels: labels,
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          background: 'transparent',
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: '1.5rem',
              fontWeight: 700,
              color: undefined,
              formatter: (val: string) => val,
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#64748B',
              formatter: () => `${total}`,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      colors: ['#fff'],
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: { width: 180 },
          plotOptions: {
            pie: { donut: { size: '68%' } },
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: { width: 220 },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 overflow-hidden rounded-2xl border border-stroke bg-white shadow-md transition-shadow hover:shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-6 xl:col-span-6">
      {/* Card header with accent */}
      <div className="border-b border-stroke bg-gray/20 px-5 py-4 dark:border-strokedark dark:bg-meta-4/20 sm:px-6">
        <h3 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
          {title}
        </h3>
        <p className="mt-0.5 text-sm text-body dark:text-bodydark">
          {t('charts.Active')} / {t('charts.Lazy')} / {t('charts.Inactive')} —{' '}
          <span className="font-medium text-black dark:text-white">{total}</span>{' '}
          total
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 px-5 pb-6 pt-5 sm:flex-row sm:gap-8 sm:px-6">
        <div className="shrink-0">
          <div id="chartThree" className="mx-auto flex justify-center">
            <ReactApexChart
              options={options}
              series={displaySeries}
              type="donut"
              height={240}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[10rem]">
          {statesData.length > 0 ? (
            statesData.map((state, index) => {
              const percent =
                total > 0 ? Math.round((state.count / total) * 100) : 0;
              return (
                <Link
                  key={index}
                  to={state.link}
                  className="group flex items-center gap-3 rounded-xl border border-stroke bg-gray/30 px-3.5 py-2.5 transition-colors hover:border-stroke hover:bg-gray/50 dark:border-strokedark dark:bg-meta-4/20 dark:hover:bg-meta-4/30"
                >
                  <span
                    className="block h-3.5 w-3.5 shrink-0 rounded-full ring-2 ring-white dark:ring-boxdark"
                    style={{ backgroundColor: state.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <span
                      className="block text-sm font-medium sm:text-[15px]"
                      style={{ color: state.color }}
                    >
                      {t(`charts.${state.label}`)}
                    </span>
                    <span className="block text-xs text-body dark:text-bodydark">
                      <span className="font-medium text-black dark:text-white">{percent}%</span>
                      {' — '}
                      <span>{state.count}</span>
                    </span>
                  </div>
                  <span className="shrink-0 text-right text-sm font-semibold tabular-nums text-black dark:text-white">
                    {state.count}
                  </span>
                </Link>
              );
            })
          ) : (
            <p className="text-body dark:text-bodydark">
              No state data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
