import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import ImageWithFullscreen from '../../components/Fullscreen/Fulllscreen';
import { useTranslation } from 'react-i18next';

// Define the type for 'item'
// interface Item {
//   verification_request_id: string;
//   customer_id: number;
//   customer_name: string;
//   verified_by: string;
//   verification_type: string;
//   verification_type_number: number;
//   verification_type_image: string;
//   transaction_image: string;
// }

// Define the types for the component props
interface CategoryPopupProps {
  item: any;
  isModalShow: boolean;
  setIsModalShow: (isModalShow: boolean) => void;
}

const CategoryPopup: React.FC<CategoryPopupProps> = ({
  item,
  isModalShow,
  setIsModalShow,
}) => {
  console.log('item', item);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const closeModal = () => {
    setIsModalShow(false);
  };

  const handleClickName = (customerId: number) => {
    navigate(`/profile/${customerId}`);
  };
  //   console.log(item);

  const createdAtDate = new Date(item?.verified_at);
  const datePart = createdAtDate.toLocaleDateString();
  return (
    <div>
      {isModalShow && (
        <div className="fixed py-5 inset-0 z-50 flex justify-center items-center w-full h-screen bg-TheadBorder-light bg-opacity-20">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white flex flex-col rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={closeModal}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                  rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 
                 dark:hover:text-white"
              >
                <IoClose className="text-lg" />
              </button>
              <div className="text-center m-5">
                <h3 className="text-xl font-semibold text-text-light dark:text-text-dark my-5">
                  {t('CategoryPopup.title')}
                  <span className="mx-4">
                    RS-{item.category_subscription_id}
                  </span>
                </h3>
                <h3
                  onClick={() => handleClickName(item.customer_id)}
                  className="cursor-pointer text-xl m-3 font-semibold dark:text-TextGreen text-TextBlue"
                >
                  {item.name}
                </h3>

                <div className="grid grid-cols-3 gap-2 w-full">
                  <div className="bg-primaryBG-light dark:bg-primaryBG-dark text-text-light dark:text-text-dark border border-Input-border p-2 rounded-lg">
                    <span className="block text-lg">
                      {t('CategoryPopup.verified_by')}
                    </span>
                    <span className="text-lg ">{item?.verified_by}</span>
                  </div>
                  <div className="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark p-2 border border-Input-border rounded-lg">
                    <span className="block text-lg">
                      {t('CategoryPopup.date')}
                    </span>
                    <span className="text-lg ">{datePart}</span>
                  </div>
                  <div className="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark p-2 border border-Input-border rounded-lg">
                    <span className="block text-lg">
                      {t('CategoryPopup.id')}
                    </span>
                    <span className="text-sm ">
                      RS-{item.category_subscription_id}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center p-2">
                  <div className="flex gap-4 rounded-lg">
                    <div className="border border-Input-border rounded-lg">
                      <span className="block text-lg text-text-light dark:text-text-dark mb-2">
                        {t('CategoryPopup.transaction_image')}
                      </span>
                      <ImageWithFullscreen
                        src={item.transaction_image}
                        alt="transaction_image"
                        className="w-52 h-30 object-cover mx-auto my-2 rounded-md full-screen-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPopup;
