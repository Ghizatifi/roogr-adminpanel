import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import axiosInstance from '../../axiosConfig/instanc';
import { toast, ToastContainer } from 'react-toastify';
import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import InputText from '../form/InputText';
import ImageBase from './ImageBase';
interface SettingsPopupProps {
  id?: number;
  bank_name?: string;
  bank_account_name?: string;
  bank_account_num?: string;
  bank_ipan?: string;
  bank_img?: string;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  display: () => Promise<void>;
}
interface BankValues {
  bank_name: string;
  bank_account_num: string;
  bank_account_name: string;
  bank_ipan: string;
  bank_img: string;
}

const BankPopup = ({
  bank_name,
  id,
  isModalOpen,
  bank_account_num,
  bank_account_name,
  bank_img,
  bank_ipan,
  setIsModalOpen,
  display,
}: SettingsPopupProps) => {
  const { t } = useTranslation();
  const closeModal = () => setIsModalOpen(false);
  const initialValues: BankValues = {
    bank_name: bank_name || '',
    bank_account_num: bank_account_num || '',
    bank_account_name: bank_account_name || '',
    bank_ipan: bank_ipan || '',
    bank_img: bank_img || '',
  };

  const handleCategorySubmit = async (
    values: BankValues,
    { setSubmitting }: FormikHelpers<BankValues>,
  ) => {
    try {
      setSubmitting(true);
      if (id) {
        const res = await axiosInstance.put(`/banks/${id}`, values, {
          headers: { 'Content-Type': 'application/json' },
        });

        toast.success(` ${name} ${t('popup.edit_toast')}`);
      } else if (!id) {
        const res = await axiosInstance.post(`/banks`, values, {
          headers: { 'Content-Type': 'application/json' },
        });

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
                  {id && ` ${t('settings.edit')} ${bank_name} `}
                </h3>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleCategorySubmit}
                >
                  {({
                    isSubmitting,
                    values,
                    setFieldValue,
                  }: FormikProps<BankValues>) => (
                    <Form>
                      <InputText
                        type={`text`}
                        name={`bank_account_name`}
                        label={t(`settings.accountHolder`)}
                        flex="flex justify-around"
                      />
                      <InputText
                        type={`text`}
                        name={`bank_account_num`}
                        label={t(`settings.accountNumber`)}
                        flex="flex justify-around"
                      />
                      <InputText
                        type={`text`}
                        name={`bank_ipan`}
                        label={t(`settings.bankIBAN`)}
                        flex="flex justify-around"
                      />
                      <InputText
                        type={`text`}
                        name={`bank_name`}
                        label={t('settings.bankName')}
                        flex="flex justify-around"
                      />
                      <ImageBase
                        name={`bank_img`}
                        setFieldValue={setFieldValue}
                        imageUrl={bank_img}
                        label={t(`settings.bankLogo`)}
                      />
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

export default BankPopup;
