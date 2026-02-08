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

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
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
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 150,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-2xl border border-stroke bg-white px-5 pb-6 pt-6 shadow-sm dark:border-strokedark dark:bg-boxdark sm:px-6 xl:col-span-6">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
          {title}
          <span className="ml-1.5 font-normal text-body dark:text-bodydark">({total})</span>
        </h3>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <div className="shrink-0">
          <div id="chartThree" className="mx-auto flex">
            <ReactApexChart options={options} series={series} type="donut" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[8rem]">
          {statesData.length > 0 ? (
            statesData.map((state, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="block h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: state.color }}
                />
                <p className="flex flex-1 items-center justify-between gap-2 text-[15px] font-[400] sm:text-[16px]" style={{ color: state.color }}>
                  <Link to={state.link} className="hover:underline">
                    {t(`charts.${state.label}`)}
                  </Link>
                  <span className="shrink-0">({state.count})</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-body dark:text-bodydark">No state data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
