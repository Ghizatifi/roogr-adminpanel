import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { useProductReports } from '../../hooks/Reports/ProductReports';
import useToggleReportStatus from '../../hooks/Reports/ToggleReportStatus';
import ImageWithFullscreen from '../../components/Fullscreen/Fulllscreen';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import MainTable from '../../components/lastnews/MainTable';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import useDeleteReport from '../../hooks/Reports/DelReport';

const ProductReport: React.FC<{ query?: string }> = ({ query }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();

  const { data, refreshReports } = useProductReports('product', status, query);

  const { isSuccess, toggleStatus, setIsSuccess } = useToggleReportStatus();
  const { deleteReport, isDeleted, resetDeleteStatus } = useDeleteReport();

  useEffect(() => {
    if (isSuccess) {
      refreshReports();
      setIsSuccess(false);
    }
  }, [isSuccess, refreshReports, setIsSuccess]);
  useEffect(() => {
    if (isDeleted) {
      refreshReports();
      resetDeleteStatus();
    }
  }, [isDeleted, refreshReports, resetDeleteStatus]);
  const handleEditClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleToggleClick = (type: string, id: number) => {
    toggleStatus(type, id);
  };
  const handleDeleteClick = (type: string, id: number) => {
    deleteReport(type, id);
  };
  const headers = [
    { key: 'id', content: t('Reports.headers.id'), className: 'text-center' },
    {
      key: 'name',
      content: t('Reports.headers.name'),
      className: 'text-center',
    },
    {
      key: 'product',
      content: t('Reports.headers.product'),
      className: 'text-center',
    },
    {
      key: 'created_at',
      content: t('Reports.headers.created_at'),
      className: 'text-center',
    },
    {
      key: 'actions',
      content: t('Reports.headers.actions'),
      className: 'text-center',
    },
    status === 0
      ? {
          key: 'revision',
          content: t('Reports.headers.revision'),
          className: 'text-center',
        }
      : {
          key: 'remove',
          content: t('Reports.headers.remove'),
          className: 'text-center',
        },
  ];

  const logs = Array.isArray(data)
    ? data.map((item) => ({
        id: item.report_id,
        type: 2,
        columns: [
          {
            key: 'id',
            content: `RT-${item.report_id}`,
            className: 'flex justify-center',
          },
          { key: 'name', content: item.name, className: 'flex justify-center' },
          {
            key: 'product_image',

            content: (
              <ImageWithFullscreen
                src={
                  item.product_image === 'https://roogr.sa/api/image/'
                    ? '/not.png'
                    : item.product_image || '/not.png'
                }
                alt="Transaction"
                className="w-10 h-10 object-cover"
              />
            ),
            className: 'flex justify-center',
          },
          {
            key: 'created_at',
            content: new Date(item.created_at).toLocaleDateString(),
            className: 'flex justify-center',
          },
          {
            key: 'actions',
            content: (
              <div className="bg-EditIconBg rounded-md">
                <img
                  src="/Edit.svg"
                  className="w-6 h-6 text-center p-1 cursor-pointer"
                  onClick={() => handleEditClick(item.product_id)}
                />
              </div>
            ),
            className: 'flex justify-center',
          },
          status === 0
            ? {
                key: 'review',
                content: (
                  <div className="bg-[#767876] rounded-md">
                    <img
                      src="/confirm.png"
                      className="w-6 h-6 text-center p-1 cursor-pointer"
                      onClick={() =>
                        handleToggleClick('product', item.report_id)
                      }
                    />
                  </div>
                ),
                className: 'flex justify-center',
              }
            : {
                key: 'remove',
                content: (
                  <div className="bg-RemoveIconBg rounded-md">
                    <img
                      src="/remove.svg"
                      className="w-6 h-6 text-center p-1 cursor-pointer"
                      onClick={() =>
                        handleDeleteClick('product', item.report_id)
                      }
                    />
                  </div>
                ),
                className: 'flex justify-center',
              },
        ],
      }))
    : [];

  return (
    <div>
      <Breadcrumb
        breadcrumbLinks={[{ label: t('Reports.label.product'), path: '/' }]}
        pageName={t('Reports.label.product')}
      />
      <AccordionHeader2
        titles={[t('Reports.titles.reports'), t('Reports.titles.revision')]}
        onTitleClick={(index) => {
          const statusMap = [0, 1];
          setStatus(statusMap[index]);
        }}
        children={[
          <div>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
        ]}
      />
    </div>
  );
};

export default ProductReport;
