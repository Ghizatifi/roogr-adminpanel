import React, { useEffect } from 'react';
import AdvertisementForm from '../../components/products/AdvertisementForm';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useTranslation } from 'react-i18next';
import useBanProduct from '../../hooks/products/useBanProduct';
import useHandleAction from '../../hooks/useHandleAction';
import useProduct from '../../hooks/products/useGetProduct';
import PageLoader from '../../common/PageLoader';

const NotBannedIconSrc = '/whiteblock.png';
const BannedIconSrc = '/block.svg';
const PrdDetials: React.FC = () => {
  const { t } = useTranslation();
  const { product, loading: productLoading, error, refreshProduct } = useProduct();
  const breadcrumbLinks = [{ label: t('ProdDetials.label.label'), path: '/products' }];

  if (productLoading) {
    return (
      <PageLoader
        pageName={t('ProdDetials.label.pageName')}
        breadcrumbLinks={breadcrumbLinks}
      />
    );
  }
  if (error || !product) {
    return (
      <div className="space-y-4">
        <Breadcrumb pageName={t('ProdDetials.label.pageName')} breadcrumbLinks={breadcrumbLinks} />
        <div className="rounded-xl border border-stroke bg-white p-8 text-center dark:border-strokedark dark:bg-boxdark">
          <p className="text-body dark:text-bodydark">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }
  const { banProduct, isSuccess } = useBanProduct();
  const { handleAction, loading } = useHandleAction();
  const handleBan = (productId: number, isBanned: boolean) => {
    handleAction(productId, isBanned, 'ban', banProduct, {
      confirmButtonClass: 'bg-BlockIconBg',
      cancelButtonClass: 'bg-gray-300',
    });
  };
  useEffect(() => {
    if (isSuccess) {
      refreshProduct();
    }
  }, [isSuccess, refreshProduct]);
  return (
    <div>
      <div className="flex justify-between">
        <Breadcrumb
          breadcrumbLinks={breadcrumbLinks}
          pageName={t('ProdDetials.label.pageName')}
          // product={product}
        />
        {product && (
          <div
            // className={
            //   user?.isBanned
            //     ? `bg-BlockIconBg rounded-md`
            //     : `bg-gray-400 rounded-md`
            // }
            className={`${
              product.is_banned === 0
                ? `bg-gray-400 rounded-md`
                : `bg-BlockIconBg rounded-md`
            } w-7 h-7  rounded-md`}
          >
            <img
              src={NotBannedIconSrc}
              className={`w-8 h-7 text-center p-1 cursor-pointer ${
                loading ? 'opacity-50' : ''
              }`}
              onClick={() =>
                !loading &&
                product.id &&
                handleBan(product.id, product.is_banned === 1)
              }
            />
            {/* <div className="bg-RemoveIconBg rounded-md">
            <img
              src={RemoveIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() =>
                !actionLoading &&
                user?.id &&
                handleAction(user.id, false, 'remove', removeUser, {
                  confirmButtonClass: 'bg-RemoveIconBg ', // Remove button class
                  cancelButtonClass: '', // Cancel button class
                })
              }
            /></div> */}
          </div>
        )}
      </div>

      {/*  */}
      {product && <AdvertisementForm product={product} />}
    </div>
  );
};

export default PrdDetials;
