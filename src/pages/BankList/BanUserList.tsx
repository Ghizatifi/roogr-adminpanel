import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import MainTable from '../../components/lastnews/MainTable';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useBanUser from '../../hooks/users/useBanUser';
import useBannedUsers from '../../hooks/Ban/UserBanList';

const BannedIconSrc = '/whiteblock.png';
const EditIconSrc = '/Edit.svg';

const BanUserList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const breadcrumbLinks = [{ label: t('BanList.users.label'), path: '/' }];

  const { banUser } = useBanUser();
  const { handleAction, loading: actionLoading } = useHandleAction();

  const {
    bannedUsers,
    loading: bannedUsersLoading,
    error: bannedUsersError,
    refreshBannedUsers,
  } = useBannedUsers();

  const handleClickName = (adminId: number) => {
    navigate(`/profile/${adminId}`);
  };

  if (bannedUsersLoading) return <p>Loading...</p>;
  if (bannedUsersError) return <p>Error: {bannedUsersError}</p>;

  const userlogs = bannedUsers.map((user) => ({
    id: user.customer_id,
    columns: [
      {
        key: 'name',
        content:
          user.name.split(' ').slice(0, 2).join(' ').slice(0, 13) || 'N/A',
        className: 'text-center dark:text-[#32E26B] text-[#0E1FB2]',
      },
      {
        key: 'created_at',
        content: new Date(user.created_at).toLocaleDateString(),
        className: 'text-center',
      },
      {
        key: 'admin',
        content: user.admin || 'N/A',
        className: 'text-center',
      },
      {
        key: 'ban_reason',
        content: user.ban_reason || 'N/A',
        className: 'text-center',
      },
      {
        key: 'Edit',
        content: (
          <div className="bg-EditIconBg rounded-md">
            <img
              src={EditIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() => handleClickName(user.customer_id)}
            />
          </div>
        ),
        className: 'flex justify-center',
      },
      {
        key: 'is_banned',
        content: (
          <div className="bg-BlockIconBg rounded-md ">
            <img
              src={BannedIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() =>
                !actionLoading &&
                user?.customer_id &&
                handleAction(
                  user.customer_id,
                  user.is_banned === 1,
                  'ban',
                  banUser,
                  {
                    confirmButtonClass: 'bg-BlockIconBg ',
                    cancelButtonClass: '',
                  },
                  refreshBannedUsers,
                )
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
      key: 'name',
      content: t('BanList.users.name'),
      className: 'text-center',
    },
    {
      key: 'Date',
      content: t('BanList.users.Date'),
      className: 'text-center',
    },
    {
      key: 'byAdmin',
      content: t('BanList.users.byAdmin'),
      className: 'text-center',
    },
    {
      key: 'banReason',
      content: t('BanList.users.banReason'),
      className: 'text-center',
    },

    {
      key: 'show',
      content: t('BanList.users.show'),
      className: 'text-center',
    },
    {
      key: 'BanStatus',
      content: t('BanList.users.status'),
      className: 'text-center',
    },
  ];
  // const UnBanheaders = [
  //   {
  //     key: 'ChatId',
  //     content: t('BanList.users.ChatId'),
  //     className: 'text-center',
  //   },

  //   {
  //     key: 'UnBanDate',
  //     content: t('BanList.users.UnBanDate'),
  //     className: 'text-center',
  //   },
  //   {
  //     key: 'UnBanbyAdmin',
  //     content: t('BanList.users.UnBanbyAdmin'),
  //     className: 'text-center',
  //   },
  //   {
  //     key: 'UnBanbanReason',
  //     content: t('BanList.users.UnBanReason'),
  //     className: 'text-center',
  //   },

  //   {
  //     key: 'show',
  //     content: t('BanList.users.show'),
  //     className: 'text-center',
  //   },
  //   {
  //     key: 'BanStatus',
  //     content: t('BanList.users.status'),
  //     className: 'text-center',
  //   },
  // ];
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
            <NotFoundSection data={userlogs} />
            <MainTable logs={userlogs} header2={true} headers={headers} />
          </div>,
          <div key="UnBan">
            {/* <NotFoundSection data={Chatlogs} /> */}
            {/* <MainTable logs={Chatlogs} header2={true} headers={UnBanheaders} /> */}
          </div>,
        ]}
        footerItems={[
          <div className="flex gap-5" key="footer">
            <span>({userlogs.length || 0})</span>
            {/* <span>
              <img src="/redRemove.svg" alt="Remove" />
            </span> */}
          </div>,
        ]}
      />
    </>
  );
};

export default BanUserList;
