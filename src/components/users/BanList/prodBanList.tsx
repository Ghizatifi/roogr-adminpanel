import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate, useParams } from 'react-router-dom';
import useBanProduct from '../../../hooks/products/useBanProduct';
import useHandleAction from '../../../hooks/useHandleAction';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import AccordionHeader2 from '../../Accordion/AccordionHeader2';
import NotFoundSection from '../../Notfound/NotfoundSection';
import MainTable from '../../lastnews/MainTable';
import useBannedUserProducts from '../../../hooks/users/UserBanProduct';

const EditIconSrc = '/Edit.svg';
const NotBannedIconSrc = '/whiteblock.png';

const UserBanProdList: React.FC = () => {
  const { id } = useParams();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const breadcrumbLinks = [{ label: '', path: '/' }];

  const { banProduct, isSuccess } = useBanProduct();
  const { handleAction } = useHandleAction();

  const { bannedUserProds, refreshBannedUserProds } = useBannedUserProducts(id);
  useEffect(() => {
    if (isSuccess) {
      refreshBannedUserProds();
    }
  }, [isSuccess]);
  const handleClickName = (prodId: number) => {
    navigate(`/products/${prodId}`);
  };

  // if (bannedProdsLoading) return <p>Loading...</p>;
  // if (bannedProdsError) return <p>Error: {bannedProdsError}</p>;
  // const handleActionCallback = () => {
  // refreshBannedUserProds();
  // };
  const headers = [
    {
      key: 'name',
      content: t('BanList.products.name'),
      className: 'text-center',
    },
    {
      key: 'Date',
      content: t('BanList.products.Date'),
      className: 'text-center',
    },
    {
      key: 'byAdmin',
      content: t('BanList.products.byAdmin'),
      className: 'text-center',
    },
    {
      key: 'banReason',
      content: t('BanList.products.banReason'),
      className: 'text-center',
    },

    {
      key: 'show',
      content: t('BanList.products.show'),
      className: 'text-center',
    },
    {
      key: 'BanStatus',
      content: t('BanList.products.status'),
      className: 'text-center',
    },
  ];

  const userlogs = bannedUserProds.map((prod) => ({
    id: prod.id,
    columns: [
      {
        key: 'name',
        content: prod.product_name
          ? prod.product_name.split(' ').slice(0, 2).join(' ').slice(0, 10) +
            '..'
          : 'N/A',
        className: 'text-center',
      },
      {
        key: 'date_of_ban',
        content: prod.created_at
          ? new Date(prod.created_at).toLocaleDateString()
          : 'null',
        className: 'text-center',
      },
      {
        key: 'admin_name',
        content: prod.admin
          ? prod.admin.split(' ').slice(0, 2).join(' ').slice(0, 10)
          : 'N/A',
        className: 'text-center',
      },
      {
        key: 'ban_reason',
        content:
          prod.reason.split(' ').slice(0, 2).join(' ').slice(0, 13) || 'N/A',
        className: 'text-center',
      },
      {
        key: 'Edit',
        content: (
          <div className="bg-EditIconBg rounded-md">
            <img
              src={EditIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() => handleClickName(prod.product_id)}
            />
          </div>
        ),
        className: 'flex justify-center',
      },
      {
        key: 'is_banned',
        content: (
          <div
            // className="bg-BlockIconBg rounded-md"
            className={
              prod?.is_banned
                ? `bg-BlockIconBg rounded-md`
                : `bg-gray-400 rounded-md`
            }
          >
            <img
              src={NotBannedIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() =>
                // !actionLoading &&
                handleAction(
                  prod.product_id,
                  prod.is_banned === 1,
                  'ban',
                  banProduct,
                  {
                    confirmButtonClass: 'bg-BlockIconBg ',
                    cancelButtonClass: '',
                  },
                )
              }
            />
          </div>
        ),
        className: 'flex justify-center',
      },
    ],
  }));

  return (
    <>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName={t('BanList.products.pageName')}
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
export default UserBanProdList;
