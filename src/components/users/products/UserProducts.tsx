import React, { useEffect, useState } from 'react';
import NotFoundSection from '../../Notfound/NotfoundSection';
import MainTable from '../../lastnews/MainTable';
import useHandleAction from '../../../hooks/useHandleAction';
import { useNavigate } from 'react-router-dom';
import useBanProduct from '../../../hooks/products/useBanProduct';
import { User } from '../../../types/user';
import { useTranslation } from 'react-i18next';
import useUserProducts from '../../../hooks/products/useUserProducts';
import useDeleteProducts from '../../../hooks/products/DelProducts';
//
const EditIconSrc = '/Edit.svg';
const CheckboxIconSrc = '/checkbox.svg';
const NotBannedIconSrc = '/unblock.svg';
const BannedIconSrc = '/block.svg';
//
interface ProfileAccordionProps {
  user: User;
  //   loading: boolean;
  //   error: string | null;
}
const UserProducts: React.FC<ProfileAccordionProps> = ({ user }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { handleAction, loading: actionLoading } = useHandleAction();
  const { banProduct, loadingPrdBan, banPrdError } = useBanProduct();
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const {
    products: logsUserProducts,

    refreshProductsUser,
  } = useUserProducts(user.id);
  const { deleteProducts, isSuccess } = useDeleteProducts();
  useEffect(() => {
    if (isSuccess) {
      refreshProductsUser();
    }
  }, [isSuccess]);
  const handleBan = (productId: number, isBanned: boolean) => {
    handleAction(
      productId,
      isBanned,
      'ban',
      banProduct,
      {
        confirmButtonClass: 'bg-BlockIconBg',
        cancelButtonClass: 'bg-gray-300',
      },
      refreshProductsUser,
    );
  };

  const handleProdProfile = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleRemoveClick = (productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const confirmDeletion = () => {
    deleteProducts(selectedProductIds);
    setSelectedProductIds([]);
  };
  const logsProducts = logsUserProducts?.map((product) => {
    const createdAtDate = new Date(product.date);
    const datePart = createdAtDate.toLocaleDateString();
    const timePart = createdAtDate.toLocaleTimeString();

    return {
      id: product.id,
      type: 2,
      columns: [
        {
          key: 'id',
          content: product.id,
          className: 'flex justify-center',
        },

        {
          key: 'created_at_date',
          content: datePart,
          className: 'date-class',
        },
        {
          key: 'created_at_time',
          content: timePart,
          className: 'time-class',
        },
        {
          key: 'category',
          content: product.category_name,
          className: 'flex justify-center',
        },
        {
          key: 'product_name',
          content: product?.product_name
            ?.split(' ')
            .slice(0, 2)
            .join(' ')
            .slice(0, 12),
          className: 'flex justify-center',
        },
        {
          key: 'thumbnail',
          content: (
            <img
              src={product.thumbnail}
              alt={product.product_name}
              className="w-10 h-10 object-cover"
            />
          ),
          className: 'flex justify-center',
        },
        {
          key: 'Edit',
          content: (
            <div className="bg-EditIconBg rounded-md">
              <img
                src={EditIconSrc}
                className="w-6 h-6 text-center p-1 cursor-pointer"
                onClick={() => handleProdProfile(product.id)}
              />
            </div>
          ),
          className: 'flex justify-center',
        },
        {
          key: 'isBanned',
          content: (
            <img
              src={product.is_banned === 0 ? NotBannedIconSrc : BannedIconSrc}
              className={`w-8 h-8 text-center p-1 cursor-pointer ${
                actionLoading ? 'opacity-50' : ''
              }`}
              onClick={() =>
                !actionLoading && handleBan(product.id, product.is_banned === 1)
              }
            />
          ),
          className: 'flex justify-center',
        },
        {
          key: 'remove',
          content: (
            <img
              src={CheckboxIconSrc}
              alt="Remove"
              onClick={() => handleRemoveClick(product.id)}
              className={`w-5 h-5 text-center cursor-pointer ${
                loadingPrdBan ? 'opacity-50' : ''
              } ${
                selectedProductIds.includes(product.id)
                  ? 'bg-red-600 rounded-full p-1'
                  : ''
              }`}
            />
          ),
          className: 'flex justify-center',
        },
      ],
    };
  });
  //
  const headers = [
    { key: 'id', content: t('products.id'), className: 'text-center' },
    { key: 'date', content: t('products.date'), className: 'text-center' },
    { key: 'time', content: t('products.time'), className: 'text-center' },
    {
      key: 'category',
      content: t('products.category'),
      className: 'text-center',
    },
    {
      key: 'ProdName',
      content: t('products.ProdName'),
      className: 'text-center',
    },
    { key: 'image', content: t('products.photo'), className: 'text-center' },
    { key: 'show', content: t('products.Edit'), className: 'text-center' },
    {
      key: 'BanStatus',
      content: t('products.BanStatus'),
      className: 'text-center',
    },
    {
      key: 'removeStatus',
      content: (
        <img
          src="/redRemove.svg"
          alt="Remove"
          onClick={confirmDeletion}
          className="cursor-pointer"
        />
      ),
      className: 'text-center flex justify-center',
    },
  ];
  return (
    <div className="my-5">
      <NotFoundSection data={logsProducts} />
      <MainTable logs={logsProducts || []} headers={headers || []} />
    </div>
  );
};

export default UserProducts;
