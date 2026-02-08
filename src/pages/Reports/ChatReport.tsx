// import ReportType from '../../components/reports/ReportType';
// import { useLocation } from 'react-router-dom';

// const ChatReport = () => {
//   const location = useLocation();
//   const { id } = location.state || {};
//   return (
//     <div>
//       <ReportType reportType="chat" query={id}/>
//     </div>
//   );
// };

// export default ChatReport;
import React, { useEffect, useState } from 'react';
import { useProductReports } from '../../hooks/Reports/ProductReports';

import { Link } from 'react-router-dom';
import useToggleReportStatus from '../../hooks/Reports/ToggleReportStatus';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import MainTable from '../../components/lastnews/MainTable';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import useDeleteReport from '../../hooks/Reports/DelReport';

const ChatReport: React.FC<{ query?: string }> = ({ query }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(0);
  const [reportId, setReportId] = useState(0);

  const { data, refreshReports } = useProductReports('chat', status, query);
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
      key: 'speakerTo',
      content: t('Reports.headers.speakerTo'),
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
        id: item.chat_report_id,
        type: 2,
        columns: [
          {
            key: 'id',
            content: `RC-${item.chat_report_id}`,
            className: 'flex justify-center',
          },
          {
            key: 'name',
            content: item.reported || 'N/A',
            className: 'flex justify-center',
          },
          {
            key: 'speakerTo',
            content: item.reporter || 'N/A',
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
                <Link
                  to={`/reports/chat/${item.chat_report_id}`}
                  state={{ reportId: item.chat_report_id }}
                >
                  <img
                    src="/Edit.svg"
                    className="w-6 h-6 text-center p-1 cursor-pointer"
                  />
                </Link>
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
                        handleToggleClick('chat', item.chat_report_id)
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
                        handleDeleteClick('chat', item.chat_report_id)
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
        breadcrumbLinks={[{ label: t('Reports.label.chat'), path: '/' }]}
        pageName={t('Reports.label.chat')}
      />
      <AccordionHeader2
        titles={[t('Reports.titles.reports'), t('Reports.titles.revision')]}
        onTitleClick={(index) => setStatus(index === 0 ? 0 : 1)}
        children={[
          <div key={status}>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div key={status}>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
        ]}
      />
    </div>
  );
};

export default ChatReport;
