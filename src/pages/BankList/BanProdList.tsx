import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import MainTable from '../../components/lastnews/MainTable';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useBanProduct from '../../hooks/products/useBanProduct';
import useBannedProducts from './../../hooks/Ban/ProdBanList';

const BannedIconSrc = '/whiteblock.png';

const EditIconSrc = '/Edit.svg';

const BanProdList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const breadcrumbLinks = [{ label: t('BanList.products.label'), path: '/' }];

  const {
    banProduct,
    loadingPrdBan: unbanLoading,
    banPrdError: unbanError,
  } = useBanProduct();
  const { handleAction, loading: actionLoading } = useHandleAction();

  const {
    bannedProds,
    loading: bannedProdsLoading,
    error: bannedProdsError,
    refreshBannedProds,
  } = useBannedProducts();
  const handleClickName = (prodId: number) => {
    navigate(`/products/${prodId}`);
  };

  // if (bannedProdsLoading) return <p>Loading...</p>;
  // if (bannedProdsError) return <p>Error: {bannedProdsError}</p>;
  const handleActionCallback = () => {
    refreshBannedProds();
  };
  const userlogs = bannedProds.map((prod) => ({
    id: prod.id,
    columns: [
      {
        key: 'name',
        content:
          prod.product_name.split(' ').slice(0, 2).join(' ').slice(0, 10) +
            '..' || 'N/A',
        className: 'text-center',
      },
      {
        key: 'date_of_ban',
        content: new Date(prod.date_of_ban).toLocaleDateString(),
        className: 'text-center',
      },
      {
        key: 'admin_name',
        content: prod.admin_name || 'N/A',
        className: 'text-center',
      },
      {
        key: 'ban_reason',
        content: prod.ban_reason || 'N/A',
        className: 'text-center',
      },
      {
        key: 'Edit',
        content: (
          <div className="bg-EditIconBg rounded-md">
            <img
              src={EditIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() => handleClickName(prod.id)}
            />
          </div>
        ),
        className: 'flex justify-center',
      },
      {
        key: 'is_banned',
        content: (
          <div className="bg-BlockIconBg rounded-md">
            <img
              src={BannedIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() =>
                !actionLoading &&
                prod?.id &&
                handleAction(
                  prod.id,
                  prod.is_banned === 1,
                  'ban',
                  banProduct,
                  {
                    confirmButtonClass: 'bg-BlockIconBg ',
                    cancelButtonClass: '',
                  },
                  handleActionCallback,
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

export default BanProdList;
