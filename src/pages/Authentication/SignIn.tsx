import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../axiosConfig/instanc';
import { useDispatch } from 'react-redux';
import { setIsLoggedin } from '../../store/slices/auth';
import { FaAsterisk } from 'react-icons/fa';
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setPermissions } from '../../store/slices/permissions';
import { POST_LOGIN_REDIRECT } from '../../components/guards/LogoutGuards';
interface LoginValues {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const initialValues: LoginValues = { email: '', password: '' };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegisterSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>,
  ) => {
    try {
      setSubmitting(true);
      const res = await axiosInstance.post(`/login`, values);
      dispatch(setPermissions(res.data.data.permissions));
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.data.email);
      localStorage.setItem('first_name', res.data.data.first_name);
      localStorage.setItem('last_name', res.data.data.last_name);
      dispatch(setIsLoggedin());
      navigate(POST_LOGIN_REDIRECT, { replace: true });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="rounded-sm  bg-white dark:bg-login-boxBgDark">
        <div className="flex justify-center">
          <div className="w-full xl:w-[35vw] sm:w-[55vw]">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h1 className="mb-[5rem] text-6xl text-login dark:text-login-dark sm:text-title-5xl text-center">
                {t('login.login')}
              </h1>
              <Formik
                initialValues={initialValues}
                onSubmit={handleRegisterSubmit}
              >
                {({ isSubmitting }: FormikProps<LoginValues>) => (
                  <Form>
                    <div className="mb-4">
                      <label className="mb-2.5 font-medium text-black dark:text-white flex">
                        {t('login.name')}{' '}
                        <span>
                          <FaAsterisk className="text-[8px] text-[#E02828]" />
                        </span>
                      </label>
                      <div className="">
                        <Field
                          type="email"
                          placeholder={t('login.name')}
                          name="email"
                          className="w-full rounded-lg border border-stroke py-3 pl-6 pr-10 text-black outline-none focus-visible:shadow-none dark:border-form-strokedark"
                        />
                      </div>
                    </div>

                    <div className="mt-6 mb-14">
                      <label className="mb-2.5 flex font-medium text-black dark:text-white">
                        {t('login.password')}{' '}
                        <FaAsterisk className="text-[8px] text-[#E02828]" />
                      </label>
                      <div className="">
                        <Field
                          type="password"
                          name="password"
                          placeholder={t('login.password')}
                          className="w-full rounded-lg border border-stroke py-3 pl-6 pr-10 text-black outline-none focus-visible:shadow-none dark:border-form-strokedark"
                        />
                      </div>
                    </div>
                    <div className="mb-5">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cursor-pointer rounded-lg bg-login dark:bg-login-dark px-4 py-2 text-white dark:text-black text-2xl transition hover:bg-opacity-90"
                      >
                        {' '}
                        {t('login.go')}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default SignIn;
