import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import InputText from '../../components/form/InputText';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
interface ComissionValues {
  commission: number;
}
export default function ComissionSetting() {
  const { t } = useTranslation();
  const [commission, setCommission] = useState<number>(0);
  // const validationSchema = yup.object().shape({
  //     commission: yup.number().required(t('settings.comissionError')),
  // })
  const initialValues = { commission };

  const upateComission = async (
    values: ComissionValues,
    { setSubmitting }: FormikHelpers<ComissionValues>,
  ) => {
    try {
      setSubmitting(true);
      const res = await axiosInstance.put(`/commission/1`, values);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };
  const displayComission = async () => {
    try {
      const res = await axiosInstance.get(`/commission/1`);
      setCommission(res.data.data.commission);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    displayComission();
    setCommission(commission);
  }, [commission]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        // validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={upateComission}
      >
        {({ isSubmitting }: FormikProps<ComissionValues>) => (
          <Form>
            <div className="flex">
              <InputText
                type="number"
                isReq
                min={0}
                name="commission"
                label={t(`settings.comission`)}
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
