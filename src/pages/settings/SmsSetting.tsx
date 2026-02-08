import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import InputText from '../../components/form/InputText';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
interface SmsValues {
  config_sms_password: string;
  config_sms_tagname: string;
  config_sms_uername: string;
}

export default function SmsSetting() {
  const { t } = useTranslation();
  const [sms, setSms] = useState<SmsValues>({
    config_sms_password: '',
    config_sms_tagname: '',
    config_sms_uername: '',
  });
  const initialValues: SmsValues = {
    config_sms_password: sms.config_sms_password,
    config_sms_tagname: sms.config_sms_tagname,
    config_sms_uername: sms.config_sms_uername,
  };

  const upateSms = async (
    values: SmsValues,
    { setSubmitting }: FormikHelpers<SmsValues>,
  ) => {
    try {
      setSubmitting(true);
      const res = await axiosInstance.put(`/sms/1`, values);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };
  const displaySms = async () => {
    try {
      const res = await axiosInstance.get(`/sms`);
      setSms(res.data.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    displaySms();
  }, []);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={upateSms}
    >
      {({ isSubmitting }: FormikProps<SmsValues>) => (
        <Form>
          <div className="">
            <InputText
              type="text"
              isReq
              name="config_sms_password"
              label={t(`settings.usernameSms`)}
            />
            <InputText
              type="text"
              isReq
              name="config_sms_tagname"
              label={t(`settings.senderNameSms`)}
            />
            <InputText
              type="text"
              isReq
              name="config_sms_uername"
              label={t(`settings.tokenSms`)}
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
  );
}
