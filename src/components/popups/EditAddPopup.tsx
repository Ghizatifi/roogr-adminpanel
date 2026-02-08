import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import axiosInstance from '../../axiosConfig/instanc';
import { toast, ToastContainer } from 'react-toastify';
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik';
import { FaAsterisk } from 'react-icons/fa';
interface EditPopupProps {
  name?: string;
  id?: number;
  url: string;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  display: () => Promise<void>;
}
interface CategoryValues {
  name: string;
}
const EditAddPopup = ({
  name,
  id,
  url,
  isModalOpen,
  setIsModalOpen,
  display,
}: EditPopupProps) => {
  const { t } = useTranslation();
  const closeModal = () => setIsModalOpen(false);
  const initialValues: CategoryValues = { name: name || '' };
  const handleCategorySubmit = async (
    values: CategoryValues,
    { setSubmitting }: FormikHelpers<CategoryValues>,
  ) => {
    try {
      setSubmitting(true);
      if (id) {
        const res = await axiosInstance.put(`/${url}/${id}`, values);

        toast.success(` ${name} ${t('popup.edit_toast')}`);
      } else if (!id) {
        const res = await axiosInstance.post(`/${url}`, values);
        toast.success(`${t('popup.add_toast')}`);
      }
      display();
      closeModal();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
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
                  {({ isSubmitting }: FormikProps<CategoryValues>) => (
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

export default EditAddPopup;
