import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useBanUser from '../../../hooks/users/useBanUser';
import useHandleAction from '../../../hooks/useHandleAction';
import useUserBanHistory from '../../../hooks/users/UserBanHistory';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import AccordionHeader2 from '../../Accordion/AccordionHeader2';
import NotFoundSection from '../../Notfound/NotfoundSection';
import MainTable from '../../lastnews/MainTable';

const NotBannedIconSrc = '/whiteblock.png';

const BanProfileList: React.FC = ({ user }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('');
  const breadcrumbLinks = [{ label: '', path: '/' }];

  const { banUser, isSuccess } = useBanUser();
  const { handleAction } = useHandleAction();

  const { banHistory, refreshBanHistory } = useUserBanHistory(user.id);

  useEffect(() => {
    if (isSuccess) {
      refreshBanHistory();
    }
  }, [isSuccess]);
  const userlogs = banHistory.map((ban) => ({
    id: ban.admin_id,
    columns: [
      {
        key: 'name',
        content:
          user.name?.split(' ').slice(0, 2).join(' ').slice(0, 13) || 'N/A',
        className: 'text-center dark:text-[#32E26B] text-[#0E1FB2]',
      },
      {
        key: 'created_at',
        content: ban.created_at
          ? new Date(ban.created_at).toLocaleDateString()
          : 'N/A',
        className: 'text-center',
      },
      {
        key: 'admin',
        content: ban.admin_name || 'N/A',
        className: 'text-center',
      },
      {
        key: 'ban_reason',
        content:
          ban.reason.split(' ').slice(0, 2).join(' ').slice(0, 13) || 'N/A',
        className: 'text-center',
      },
      {
        key: 'is_banned',
        content: (
          <div
            // className="bg-BlockIconBg rounded-md"
            className={
              ban?.is_banned
                ? `bg-BlockIconBg rounded-md`
                : `bg-gray-400 rounded-md`
            }
          >
            <img
              src={NotBannedIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() =>
                // !actionLoading &&
                handleAction(user.id, ban.is_banned === 1, 'ban', banUser, {
                  confirmButtonClass: 'bg-BlockIconBg',
                  cancelButtonClass: '',
                })
              }
            />
          </div>
        ),
        className: 'flex justify-center',
      },
    ],
  }));

  const headers = [
    {
      key: 'Historyname',
      content: t('BanList.users.name'),
      className: 'text-center',
    },
    {
      key: 'HistoryDate',
      content: t('BanList.users.Date'),
      className: 'text-center',
    },
    {
      key: 'HistorybyAdmin',
      content: t('BanList.users.byAdmin'),
      className: 'text-center',
    },
    {
      key: 'HistorybanReason',
      content: t('BanList.users.banReason'),
      className: 'text-center',
    },
    {
      key: 'HistoryBanStatus',
      content: t('BanList.users.status'),
      className: 'text-center',
    },
  ];

  return (
    <>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName={t('BanList.users.pageName')}
      />
      <AccordionHeader2
        titles={[t('BanList.Ban'), t('BanList.unBan')]}
        onClick={(index: number) => setStatus(index === 0 ? 'Ban' : 'UnBan')}
        children={[
          <div key="Ban">
            <>
              <NotFoundSection data={userlogs} />

              <MainTable logs={userlogs} header2={true} headers={headers} />
            </>
            {/* )} */}
          </div>,
          <div key="UnBan"></div>,
        ]}
        footerItems={[
          <div className="flex gap-5" key="footer">
            <span>({userlogs.length})</span>
          </div>,
        ]}
      />
    </>
  );
};

export default BanProfileList;
