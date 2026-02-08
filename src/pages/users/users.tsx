import React, { useEffect, useState } from 'react';
import useUsers from '../../hooks/users/useAllusers';
import MainTable from '../../components/lastnews/MainTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';
import axiosInstance from '../../axiosConfig/instanc';
import Pagination from '../../components/pagination/Pagination';
import { useTranslation } from 'react-i18next';
import useBanUser from '../../hooks/users/useBanUser';
import PageLoader from '../../common/PageLoader';

const BannedIconSrc = '/block.svg';
const NotBannedIconSrc = '/unblock.svg';
const ActivatedEmailIconSrc = '/true.png';
const NotActivatedEmailIconSrc = '/x.png';
const ActivatedAccountIconSrc = '/true.png';
const NotActivatedAccountIconSrc = '/x.png';

const Users: React.FC = () => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const location = useLocation();
  const { userName } = location.state || {};
  const { users, loading, error, refreshUsers } = useUsers(currentPage, userName);
  const { handleAction, loading: actionLoading } = useHandleAction();
  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const response = await axiosInstance.get(`/users/count`);
        // console.log(response);
        setUsersCount(response.data.data.count / 10);
      } catch (err) {}
    };
    fetchUsersCount();
  }, []);
  const totalPages = Math.ceil(usersCount);
  const {
    banUser,
    loading: banUserLoading,
    error: banError,
    isSuccess,
  } = useBanUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      refreshUsers();
    }
  }, [isSuccess, refreshUsers]);

  const breadcrumbLinks = [{ label: t('users.label.label'), path: '/' }];
  if (loading) {
    return (
      <PageLoader
        pageName={t('users.label.allusers')}
        breadcrumbLinks={breadcrumbLinks}
      />
    );
  }
  if (error) {
    return (
      <div className="space-y-4">
        <Breadcrumb pageName={t('users.label.allusers')} breadcrumbLinks={breadcrumbLinks} />
        <div className="rounded-xl border border-stroke bg-white p-8 text-center dark:border-strokedark dark:bg-boxdark">
          <p className="text-body dark:text-bodydark">{error}</p>
        </div>
      </div>
    );
  }

  const handleClickName = (userId: number) => {
    navigate(`/profile/${userId}`);
  };
  //
  const logs = users.map((user) => ({
    id: user.id,
    type: user.type === 'customer' ? 1 : 2,
    columns: [
      {
        key: 'id',
        content: user.id,
        className: 'dark:text-white text-black text-center',
      },
      {
        key: 'name',
        content: (
          <span
            className="cursor-pointer dark:text-TextGreen text-TextBlue"
            onClick={() => handleClickName(user.id)}
          >
            {user.name.split(' ').slice(0, 2).join(' ').slice(0, 12)}
          </span>
        ),
        className: 'dark:text-[#32E26B] text-[#0E1FB2]',
      },
      {
        key: 'alias',
        content: user.alias.split(' '),
        className: 'dark:text-white text-black',
      },
      {
        key: 'type',
        content: user.type === 'customer' ? 'Customer' : 'Advertiser',
        className: 'dark:text-white text-black text-right',
      },
      {
        key: 'regDate',
        content: user.regDate.split(' ')[0],
        className: 'flex dark:text-white text-black',
      },
      {
        key: 'isActivatedAccount',
        content: (
          <img
            src={
              user.isActivated.account
                ? ActivatedAccountIconSrc
                : NotActivatedAccountIconSrc
            }
            alt={
              user.isActivated.account
                ? 'Account Activated'
                : 'Account Not Activated'
            }
            className="w-6 h-6 text-center"
          />
        ),
        className: 'flex justify-center',
      },
      {
        key: 'isActivatedEmail',
        content: (
          <img
            src={
              user.isActivated.email
                ? ActivatedEmailIconSrc
                : NotActivatedEmailIconSrc
            }
            alt={
              user.isActivated.email ? 'Email Activated' : 'Email Not Activated'
            }
            className="w-6 h-6 text-center"
          />
        ),
        className: 'flex justify-center',
      },
      {
        key: 'isBanned',
        content: (
          <img
            src={user.isBanned ? BannedIconSrc : NotBannedIconSrc}
            alt={user.isBanned ? 'Banned' : 'Not Banned'}
            className="w-6 h-6 text-center cursor-pointer"
            onClick={() =>
              !actionLoading &&
              user?.id &&
              handleAction(
                user.id,
                user.isBanned === 1,
                'ban',
                banUser,
                {
                  confirmButtonClass: 'bg-BlockIconBg ',
                  cancelButtonClass: '',
                },
                refreshUsers,
              )
            }
          />
        ),
        className: 'flex justify-center',
      },
    ],
  }));

  const headers = [
    { key: 'id', content: t('users.id'), className: 'text-center' },
    { key: 'name', content: t('users.name'), className: 'text-center' },
    { key: 'alias', content: t('users.alias'), className: 'text-center' },
    { key: 'type', content: t('users.type'), className: 'text-' },

    { key: 'regDate', content: t('users.regDate'), className: 'text-center' },
    {
      key: 'mobileconfirm',
      content: t('users.mobileconfirm'),
      className: 'text-center',
    },
    {
      key: 'emailleconfirm',
      content: t('users.emailleconfirm'),
      className: 'text-center',
    },
    {
      key: 'BanStatus',
      content: t('users.BanStatus'),
      className: 'text-center',
    },
  ];

  return (
    <div>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName={t('users.label.allusers')}
      />
      <MainTable logs={logs} headers={headers} />
      {banUserLoading && <p>Processing ban action...</p>}{' '}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Users;
