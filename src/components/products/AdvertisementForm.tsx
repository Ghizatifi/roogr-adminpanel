import React, { useState, useEffect } from 'react';
import ReusableInput from './ReusableInput';
import ReusableSelect from './ReusableSelectProps';
import { FaMinus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface Product {
  id?: number;
  product_name?: string;
  price?: number;
  category_name?: string;
  oc_product_description_description?: string;
  images?: string[];
  videos?: string[];
  isActivated?: number;
}

interface AdvertisementFormProps {
  product: Product | null;
}

const AdvertisementForm: React.FC<AdvertisementFormProps> = ({ product }) => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<string>('Active');
  const [price, setPrice] = useState<number>(0);
  const [adName, setAdName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string>('');

  useEffect(() => {
    if (product) {
      setAdName(product.product_name || 'N/A');
      setPrice(product.price || 0);
      setCategory(product.category_name || 'N/A');
      setDescription(product.oc_product_description_description || '');
      setImages(product.images || []);
      setVideo(
        product.videos && product.videos.length > 0 ? product.videos[0] : '',
      );
      setStatus(product.isActivated === 1 ? 'Active' : 'Inactive');
    }
  }, [product]);

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto  bg-secondaryBG-light dark:bg-secondaryBG-dark p-6 rounded-lg shadow-md">
      <ReusableInput
        label={t('ProdDetials.form.id')}
        type="text"
        value={product?.id?.toString() || 'N/A'}
        onChange={() => {}}
        extraClass="bg-Input-gray w-30"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* <ReusableSelect
          label={t('ProdDetials.form.category')}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: 'عطور', label: 'عطور' },
            { value: 'Furniture', label: 'أثاث' },
            { value: 'Electronics', label: 'الكترونيات' },
            { value: 'Clothing', label: 'ملابس' },
          ]}
          extraClass="bg-Input-blue text-black border border-Input-border"
        /> */}
        <ReusableInput
          label={t('ProdDetials.form.category')}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          extraClass="bg-Input-blue text-black border border-Input-border"
        />
        <ReusableInput
          label={t('ProdDetials.form.AdsName')}
          type="text"
          value={adName}
          onChange={(e) => setAdName(e.target.value)}
          extraClass="bg-Input-blue"
        />
        <ReusableInput
          label={t('ProdDetials.form.price')}
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          extraClass="bg-Input-blue"
        />
        <ReusableSelect
          label={t('ProdDetials.form.status')}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { value: 'Active', label: 'مفعل' },
            { value: 'Inactive', label: 'غير مفعل' },
          ]}
          extraClass="bg-Input-green text-Input-borderGreen border border-Input-borderGreen"
        />
      </div>

      <div className="mt-6">
        <label className="font-semibold mb-2 block">
          {t('ProdDetials.form.description')}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-2 border border-Input-border dark:bg-secondaryBG-dark rounded-md"
        />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-4">{t('ProdDetials.form.image')}</h3>
        <div className="grid grid-cols-4 gap-4">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div className="flex flex-col items-center" key={index}>
                <div className="flex items-center bg-gray-100 justify-between w-full px-2 py-1 rounded-t-md">
                  <div className=" text-center text-black px-2 py-1 text-xs font-bold rounded-full">
                    {index + 1}
                  </div>
                  {/* <button
                    className="bg-red-500 text-white p-1 -mt-5 rounded-full"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <FaMinus />
                  </button> */}
                </div>
                <img
                  src={image}
                  alt={`img-${index}`}
                  className="w-full h-30 -mt-1 object-cover rounded-lg"
                />
              </div>
            ))
          ) : (
            <p>{t('ProdDetials.form.NoImage')}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-4">{t('ProdDetials.form.video')}</h3>
        <div className="grid grid-cols-4 gap-4">
          {video ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center bg-gray-100 justify-between w-full px-2 rounded-t-md">
                <div className="text-center text-black px-2 py-1 text-xs font-bold rounded-full">
                  1
                </div>
                {/* <button
                  className="bg-red-500 text-white p-1 -mt-5 rounded-full"
                  onClick={() => setVideo('')}
                >
                  <FaMinus />
                </button> */}
              </div>
              <video
                controls
                src={video}
                className="w-full h-30 object-cover rounded-lg"
              />
            </div>
          ) : (
            <p>{t('ProdDetials.form.NoVideo')}</p>
          )}
        </div>
      </div>

      {/* <div className="mt-6 flex justify-center">
        <button className="text-white text-2xl bg-SaveIconBg py-2 px-6 rounded-lg flex items-center space-x-2">
          <img src="/save.svg" alt="save" />
        </button>
      </div> */}
    </div>
  );
};

export default AdvertisementForm;
