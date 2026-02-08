import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import axiosInstance from '../../axiosConfig/instanc';
import { toast, ToastContainer } from 'react-toastify';
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik';
import { FaAsterisk } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { PiUploadSimpleBold } from 'react-icons/pi';

interface EditPopupProps {
  name?: string;
  id?: number;
  isPaid?: boolean;
  url: string;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  display: () => Promise<void>;
  imageUrl?: string;
}

interface CategoryValues {
  name: string;
  thumbnail: string | null;
  isPaid: string;
}

const EditAddImgPopup = ({
  name,
  id,
  url,
  isModalOpen,
  setIsModalOpen,
  display,
  imageUrl,
  isPaid,
}: EditPopupProps) => {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState<string | null>(
    imageUrl || null,
  );
  const closeModal = () => setIsModalOpen(false);
  const initialValues: CategoryValues = {
    name: name || '',
    thumbnail: imageUrl || '',
    isPaid: isPaid ? '1' : '0',
  };
  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const base64String = await convertToBase64(file);
      if (base64String) {
        setFieldValue('thumbnail', base64String);
        setImagePreview(base64String);
      }
    }
  };
  const handleCategorySubmit = async (
    values: CategoryValues,
    { setSubmitting }: FormikHelpers<CategoryValues>,
  ) => {
    try {
      setSubmitting(true);

      if (id) {
        const res = await axiosInstance.put(`/${url}/${id}`, values, {
          headers: { 'Content-Type': 'application/json' },
        });
        toast.success(`${name} ${t('popup.edit_toast')}`);
      } else {
        const res = await axiosInstance.post(`/${url}`, values, {
          headers: { 'Content-Type': 'application/json' },
        });
        toast.success(`${t('popup.add_toast')}`);
      }

      display();
      closeModal();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div
          id={`popup-modal_add_${id}`}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-TheadBorder-light bg-opacity-20"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={closeModal}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                                    rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 
                                    dark:hover:text-white"
              >
                <IoClose className="text-lg" />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-2xl font-normal text-gray-500 dark:text-secondaryBG-light">
                  {id
                    ? ` ${t('popup.edit_title')} ${name} `
                    : t('popup.add_title')}
                </h3>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleCategorySubmit}
                >
                  {({
                    isSubmitting,
                    values,
                    setFieldValue,
                  }: FormikProps<CategoryValues>) => (
                    <Form>
                      <div className="mb-4">
                        <label className="mb-2.5 font-medium text-black dark:text-white flex">
                          {t('popup.category_name')}{' '}
                          <span>
                            <FaAsterisk className="text-[8px] text-[#E02828]" />
                          </span>
                        </label>
                        <div className="">
                          <Field
                            type="text"
                            placeholder={t('popup.category_name')}
                            name="name"
                            className="w-full rounded-lg border border-stroke py-3 pl-6 pr-10 text-black outline-none focus-visible:shadow-none dark:border-form-strokedark"
                          />
                        </div>
                      </div>
                      <div className="col-span-3 flex my-3">
                        <div className="mx-3 flex">
                          <div className="my-2 w-20 flex justify-center p-6 rounded-lg border border-dashed border-gray-900/25">
                            <div className="text-center">
                              <div className="w-26 text-sm text-gray-600">
                                <label
                                  htmlFor="thumbnail-upload"
                                  className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 
                                focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 
                                hover:text-indigo-500"
                                >
                                  <input
                                    id="thumbnail-upload"
                                    name="thumbnail"
                                    type="file"
                                    className="sr-only"
                                    onChange={(event) =>
                                      handleFileChange(event, setFieldValue)
                                    }
                                  />
                                  <span>
                                    <PiUploadSimpleBold className="text-3xl text-center m-auto" />
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {imagePreview && (
                            <div className="m-5 text-Input-borderGreen">
                              <img src={imagePreview} width={80} alt="" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="flex justify-between">
                          <button
                            className="bg-login dark:bg-login-dark text-secondaryBG-light dark:text-black focus:outline-none 
                                            font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {t('popup.save')}
                          </button>
                          <button
                            onClick={closeModal}
                            className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-secondaryBG-light 
                                            rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4
                                            focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-secondaryBG-dark dark:text-secondaryBG-light
                                            dark:border-gray-600"
                          >
                            {t('popup.cancel')}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default EditAddImgPopup;
