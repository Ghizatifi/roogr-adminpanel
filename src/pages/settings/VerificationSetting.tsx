import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import InputText from '../../components/form/InputText';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
interface VerificationValues {
  commercial_register_fee: number;
  identity_document_fee: number;
  freelancer_document_fee: number;
  verification_fee: number;
  subscription_fee: number;
}
export default function VerificationSetting() {
  const { t } = useTranslation();
  const [verification, setVerification] = useState<VerificationValues>({
    commercial_register_fee: 0,
    identity_document_fee: 0,
    freelancer_document_fee: 0,
    verification_fee: 0,
    subscription_fee: 0,
  });
  // const validationSchema = yup.object().shape({
  //     commission: yup.number().required(t('settings.comissionError')),
  // })
  const initialValues: VerificationValues = {
    commercial_register_fee: verification.commercial_register_fee,
    identity_document_fee: verification.identity_document_fee,
    freelancer_document_fee: verification.freelancer_document_fee,
    verification_fee: verification.verification_fee,
    subscription_fee: verification.subscription_fee,
  };

  const upateVerification = async (
    values: VerificationValues,
    { setSubmitting }: FormikHelpers<VerificationValues>,
  ) => {
    try {
      setSubmitting(true);
      await axiosInstance.put(`/verification_settings/1`, values);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };
  const displayVerification = async () => {
    try {
      const res = await axiosInstance.get(`/verification_settings/1`);
      setVerification(res.data.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    displayVerification();
    // setVerification(verification)
  }, []);
  return (
    <>
      <Formik
        enableReinitialize={true}
        // validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={upateVerification}
      >
        {({ isSubmitting }: FormikProps<VerificationValues>) => (
          <Form>
            <div className="">
              <InputText
                type="number"
                isReq
                min={0}
                name="commercial_register_fee"
                label={t(`settings.commercial`)}
              />
              <InputText
                type="number"
                isReq
                min={0}
                name="identity_document_fee"
                label={t(`settings.maroof`)}
              />
              <InputText
                type="number"
                isReq
                min={0}
                name="freelancer_document_fee"
                label={t(`settings.self-employment`)}
              />
              <InputText
                type="number"
                isReq
                min={0}
                name="verification_fee"
                label={t(`settings.verification-check-fees`)}
              />
              <InputText
                type="number"
                isReq
                min={0}
                name="subscription_fee"
                label={t(`settings.subscription`)}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 cursor-pointer rounded-lg bg-Input-TextGreen dark:bg-login-dark px-4 py-1 text-white dark:text-black text-2xl transition hover:bg-opacity-90"
              >
                {' '}
                {t('popup.save')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
