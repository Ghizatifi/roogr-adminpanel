import React, { useEffect, useState } from 'react';
import MainTable from '../../components/lastnews/MainTable';

import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';
import { useTranslation } from 'react-i18next';
import useFetchUsers from '../../hooks/users/useTypeUsers';
import useBanUser from '../../hooks/users/useBanUser';
import Pagination from '../pagination/Pagination';
// import { useTranslation } from 'react-i18next';

const BannedIconSrc = '/block.svg';
const NotBannedIconSrc = '/unblock.svg';
const ActivatedEmailIconSrc = '/true.png';
const NotActivatedEmailIconSrc = '/x.png';
const ActivatedAccountIconSrc = '/true.png';
const NotActivatedAccountIconSrc = '/x.png';

interface UserTypeProps {
  userType: 'customer' | 'advertiser';
}

const UserType: React.FC<UserTypeProps> = ({ userType }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);

  const { users, refreshUserType, usersCount } = useFetchUsers(
    userType,
    currentPage,
    10,
  );
  const {
    banUser,
    loading: banLoading,
    error: banError,
    isSuccess,
  } = useBanUser();
  const { handleAction, loading: actionLoading } = useHandleAction();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      refreshUserType();
    }
  }, [isSuccess]);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  const handleClickName = (userId: number) => {
    navigate(`/profile/${userId}`);
  };
  const totalPages = Math.ceil(usersCount / 10);

  const logs = users.map((user) => ({
    id: user.id,
    type: user.type === 'advertiser' ? 2 : 1, // 2 for advertiser, 1 for customer
    columns: [
      {
        key: 'id',
        content: user.id,
        className: 'dark:text-white text-center text-black',
      },
      {
        key: 'name',
        content: (
          <span
            className="cursor-pointer dark:text-[#32E26B] text-[#0E1FB2]"
            onClick={() => handleClickName(user.id)}
          >
            {user.name.split(' ').slice(0, 2).join(' ').slice(0, 12)}
          </span>
        ),
        className: 'dark:text-[#32E26B] text-center text-[#0E1FB2]',
      },
      {
        key: 'alias',
        content: user.alias.split(' ').slice(0, 2).join(' ').slice(0, 12),
        className: 'dark:text-white text-center text-black',
      },
      {
        key: 'regDate',
        content: user.regDate.split(' ')[0],
        className: 'flex dark:text-white text-center text-black',
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
                ? t('users.accountActivated')
                : t('users.accountNotActivated')
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
              user.isActivated.email
                ? t('users.emailActivated')
                : t('users.emailNotActivated')
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
            alt={user.isBanned ? t('users.banned') : t('users.notBanned')}
            className={`w-6 h-6 text-center cursor-pointer ${
              actionLoading ? 'opacity-50' : ''
            }`}
            onClick={() =>
              !actionLoading &&
              user?.id &&
              handleAction(
                user.id,
                user.isBanned === 1,
                'ban',
                banUser,
                {
                  confirmButtonClass: 'bg-BlockIconBg',
                  cancelButtonClass: '',
                },
                refreshUserType,
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
  const breadcrumbLinks = [{ label: t('users.label.label'), path: '/' }];

  return (
    <>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName={t(`users.label.${userType}`)}
      />

      {banLoading && <p>{t('users.banningUser')}...</p>}
      {banError && <p>{banError}</p>}
      <MainTable logs={logs} headers={headers} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default UserType;
