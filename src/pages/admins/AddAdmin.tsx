import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import axiosInstance from '../../axiosConfig/instanc';
import InputText from '../../components/form/InputText';
import SelectLevel from '../../components/form/SelectLevel';
import SelectTime from '../../components/form/SelectTime';
import CheckboxGroup from './CheckboxGroup';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useAdminsByType from '../../hooks/admins/AbminType';
import { useAdminState } from '../../hooks/admins/successadd';

export interface CheckboxItem {
  isChecked: boolean;
  label: string;
  name: string;
}
interface AddAdminValues {
  id?: number;
  email: string;
  phone: string;
  username?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  group_id?: string;
  password?: string;
  type?: string;
  start_working_hour: string;
  finish_working_hour: string;
  permissions: {
    adminspermissions: {
      super: number;
      charts: number;
      admins: number;
      settings: number;
    };
    ads: { all: number; primary: number; subscription: number };
    users: { all: number; advertisers: number; customers: number };
    categories: { primary: number; subscription: number; region: number };
    requests: { attestation: number; category: number };
    contact: { inquiries: number; issues: number; suggestions: number };
    reports: { chats: number; products: number };
    banlist: { chats: number; products: number };
  };
}

export default function AddAdmin() {
  const { t } = useTranslation();
  const { adminId } = useParams();
  const [loggedValues, setLoggedValues] = useState<string>('');
  const [admin, setAdmin] = useState<AddAdminValues | null>(null);
  const [permissions, setpermissions] = useState({
    adminspermissions: {
      super: admin?.permissions?.adminspermissions?.super || 0,
      charts: admin?.permissions?.adminspermissions?.charts || 0,
      admins: admin?.permissions?.adminspermissions?.admins || 0,
      settings: admin?.permissions?.adminspermissions?.settings || 0,
    },
    ads: {
      all: admin?.permissions?.ads?.all || 0,
      primary: admin?.permissions?.ads?.primary || 0,
      subscription: admin?.permissions?.ads?.subscription || 0,
    },
    users: {
      all: admin?.permissions?.users?.all || 0,
      advertisers: admin?.permissions?.users?.advertisers || 0,
      customers: admin?.permissions?.users?.customers || 0,
    },
    categories: {
      primary: admin?.permissions?.categories?.primary || 0,
      subscription: admin?.permissions?.categories?.subscription || 0,
      region: admin?.permissions?.categories?.region || 0,
    },
    requests: {
      attestation: admin?.permissions?.requests?.attestation || 0,
      category: admin?.permissions?.requests?.category || 0,
    },
    contact: {
      inquiries: admin?.permissions?.contact?.inquiries || 0,
      issues: admin?.permissions?.contact?.issues || 0,
      suggestions: admin?.permissions?.contact?.suggestions || 0,
    },
    reports: {
      chats: admin?.permissions?.reports?.chats || 0,
      products: admin?.permissions?.reports?.products || 0,
    },
    banlist: {
      chats: admin?.permissions?.banlist?.chats || 0,
      products: admin?.permissions?.banlist?.products || 0,
    },
  });
  useEffect(() => {
    const displayAdmin = async () => {
      try {
        const res = await axiosInstance.get(`/admins/${adminId}`);
        setAdmin({
          id: res.data.data?.id,
          email: res.data.data?.email,
          phone: res.data.data?.phone,
          last_name: res.data.data?.last_name,
          first_name: res.data.data?.first_name,
          group_id: res.data.data?.group_id,
          start_working_hour: res.data.data?.start_working_hour,
          finish_working_hour: res.data.data?.finish_working_hour,
          permissions: {
            adminspermissions: {
              super: res.data.data?.permissions[0],
              charts: res.data.data?.permissions[1],
              admins: res.data.data?.permissions[2],
              settings: res.data.data?.permissions[3],
            },
            ads: {
              all: res.data.data?.permissions[4],
              primary: res.data.data?.permissions[5],
              subscription: res.data.data?.permissions[6],
            },
            users: {
              all: res.data.data?.permissions[7],
              advertisers: res.data.data?.permissions[8],
              customers: res.data.data?.permissions[9],
            },
            categories: {
              primary: res.data.data?.permissions[10],
              subscription: res.data.data?.permissions[11],
              region: res.data.data?.permissions[12],
            },
            requests: {
              attestation: res.data.data?.permissions[13],
              category: res.data.data?.permissions[14],
            },
            contact: {
              inquiries: res.data.data?.permissions[15],
              issues: res.data.data?.permissions[16],
              suggestions: res.data.data?.permissions[17],
            },
            reports: {
              chats: res.data.data?.permissions[18],
              products: res.data.data?.permissions[19],
            },
            banlist: {
              chats: res.data.data?.permissions[20],
              products: res.data.data?.permissions[21],
            },
          },
        });
      } catch (error: any) {
        console.error(error);
      }
    };
    if (adminId) {
      displayAdmin();
    }
  }, [adminId]);
  const validationSchema = yup.object().shape({
    name: yup.string().required(t('admins.form.nameError')),
    password: yup.string().required(t('admins.form.PasswordError')),
    email: yup.string().required(t('admins.form.emailError')),
    phone: yup.string().required(t('admins.form.phoneError')),
    username: yup.string().required(t('admins.form.userNameError')),
    type: yup.string().required(t('admins.form.levelError')),
    permissions: yup.object().shape({
      super: yup.boolean(),
      charts: yup.boolean(),
      ads: yup.object().shape({
        all: yup.boolean(),
        primary: yup.boolean(),
        subscription: yup.boolean(),
      }),
      users: yup.object().shape({
        all: yup.boolean(),
        advertisers: yup.boolean(),
        customers: yup.boolean(),
      }),
      categories: yup.object().shape({
        primary: yup.boolean(),
        subscription: yup.boolean(),
        region: yup.boolean(),
      }),
      requests: yup.object().shape({
        attestation: yup.boolean(),
        category: yup.boolean(),
      }),
      contact: yup.object().shape({
        inquiries: yup.boolean(),
        issues: yup.boolean(),
        suggestions: yup.boolean(),
      }),
      reports: yup.object().shape({
        chats: yup.boolean(),
        products: yup.boolean(),
      }),
      banlist: yup.object().shape({
        chats: yup.boolean(),
        products: yup.boolean(),
      }),
      admins: yup.boolean(),
      settings: yup.boolean(),
    }),
  });
  const initialValues: AddAdminValues = {
    email: admin?.email || '',
    phone: admin?.phone || '',
    username: admin?.last_name || '',
    name: admin?.first_name || '',
    password: '',
    type: admin?.group_id || '2',
    start_working_hour: admin?.start_working_hour || '',
    finish_working_hour: admin?.finish_working_hour || '',
    permissions: admin?.permissions || permissions,
  };
  const logValues = (obj: any): string => {
    let result = '';
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result += logValues(obj[key]);
      } else {
        if (typeof obj[key] === 'boolean') {
          result += obj[key] ? '1' : '0';
        } else {
          result += `${obj[key]}`;
        }
      }
    }
    return result;
  };
  const breadcrumbLinks = [{ label: t('admins.label'), path: '/admins' }];
  const { isSuccessAdd, setIsSuccessAdd } = useAdminState();

  const handleAddAdminSubmit = async (
    values: AddAdminValues,
    { setSubmitting }: FormikHelpers<AddAdminValues>,
  ) => {
    try {
      setIsSuccessAdd(false);
      setSubmitting(true);
      if (adminId) {
        await axiosInstance.put(`/admin/${adminId}`, {
          ...values,
          permissions: loggedValues,
        });
        toast.success(`admin updated successfully`);
        setIsSuccessAdd(true);
        // navigate(`/admins`);
      } else if (!adminId) {
        await axiosInstance.post(`/admins`, {
          ...values,
          permissions: loggedValues,
        });

        toast.success(`admin successfully submitted`);
        setIsSuccessAdd(true);
      }
      // if (isSuccessAdd) {
      window.location.reload();
      // }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  const [checkAdvertisments, setCheckAdvertisments] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.all',
      name: `permissions.ads.all`,
    },
    {
      isChecked: false,
      label: 'admins.form.primary',
      name: `permissions.ads.primary`,
    },
    {
      isChecked: false,
      label: 'admins.form.subscription',
      name: `permissions.ads.subscription`,
    },
  ]);
  const [checkPermissions, setCheckPermissions] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.super',
      name: `permissions.super`,
    },
    {
      isChecked: false,
      label: 'admins.form.admins',
      name: `permissions.admins`,
    },
    {
      isChecked: false,
      label: 'admins.form.settings',
      name: `permissions.settings`,
    },
    {
      isChecked: false,
      label: 'admins.form.charts',
      name: `permissions.charts`,
    },
  ]);
  const [checkUsers, setCheckUsers] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.all',
      name: `permissions.users.all`,
    },
    {
      isChecked: false,
      label: 'admins.form.advertisers',
      name: `permissions.users.advertisers`,
    },
    {
      isChecked: false,
      label: 'admins.form.customers',
      name: `permissions.users.customers`,
    },
  ]);
  const [checkCategories, setCheckCategories] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.primary',
      name: `permissions.categories.primary`,
    },
    {
      isChecked: false,
      label: 'admins.form.subscription',
      name: `permissions.categories.subscription`,
    },
    {
      isChecked: false,
      label: 'admins.form.region',
      name: `permissions.categories.region`,
    },
  ]);
  const [checkSupport, setCheckSupport] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.inquiries',
      name: `permissions.contact.inquiries`,
    },
    {
      isChecked: false,
      label: 'admins.form.issues',
      name: `permissions.contact.issues`,
    },
    {
      isChecked: false,
      label: 'admins.form.suggestions',
      name: `permissions.contact.suggestions`,
    },
  ]);
  const [checkRequests, setCheckRequests] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.attestation',
      name: `permissions.requests.attestation`,
    },
    {
      isChecked: false,
      label: 'admins.form.category',
      name: `permissions.requests.category`,
    },
  ]);
  const [checkReports, setCheckReports] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.chats',
      name: `permissions.reports.chats`,
    },
    {
      isChecked: false,
      label: 'admins.form.products',
      name: `permissions.reports.products`,
    },
  ]);
  const [checkBanlist, setCheckBanlist] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.users',
      name: `permissions.banlist.chats`,
    },
    {
      isChecked: false,
      label: 'admins.form.products',
      name: `permissions.banlist.products`,
    },
  ]);
  useEffect(() => {
    if (admin) {
      type PermissionKeyAds = keyof typeof admin.permissions.ads;
      type PermissionAdmin = keyof typeof admin.permissions.adminspermissions;
      type PermissionUsers = keyof typeof admin.permissions.users;
      type PermissionCategories = keyof typeof admin.permissions.categories;
      type PermissionContact = keyof typeof admin.permissions.contact;
      type PermissionRequests = keyof typeof admin.permissions.requests;
      type PermissionReports = keyof typeof admin.permissions.reports;
      type PermissionBanlist = keyof typeof admin.permissions.banlist;
      const permissionAds: Record<PermissionKeyAds, number> = {
        all: 0,
        primary: 1,
        subscription: 2,
      };
      const permissionAdmin: Record<PermissionAdmin, number> = {
        super: 0,
        admins: 1,
        settings: 2,
        charts: 3,
      };
      const permissionUsers: Record<PermissionUsers, number> = {
        all: 0,
        advertisers: 1,
        customers: 2,
      };
      const permissionCategories: Record<PermissionCategories, number> = {
        primary: 0,
        subscription: 1,
        region: 2,
      };
      const permissionContact: Record<PermissionContact, number> = {
        inquiries: 0,
        issues: 1,
        suggestions: 2,
      };
      const permissionRequests: Record<PermissionRequests, number> = {
        attestation: 0,
        category: 1,
      };
      const permissionReports: Record<PermissionReports, number> = {
        chats: 0,
        products: 1,
      };
      const permissionBanlist: Record<PermissionBanlist, number> = {
        chats: 0,
        products: 1,
      };
      (Object.keys(permissionAds) as PermissionKeyAds[]).forEach((key) => {
        if (admin?.permissions?.ads[key] == 1) {
          setCheckAdvertisments((prevChecks) =>
            prevChecks.map((check, index) =>
              index === permissionAds[key]
                ? { ...check, isChecked: true }
                : check,
            ),
          );
        }
      });
      (Object.keys(permissionAdmin) as PermissionAdmin[]).forEach((key) => {
        if (admin?.permissions?.adminspermissions[key] == 1) {
          setCheckPermissions((prevChecks) =>
            prevChecks.map((check, index) =>
              index === permissionAdmin[key]
                ? { ...check, isChecked: true }
                : check,
            ),
          );
        }
      });
      (Object.keys(permissionUsers) as PermissionUsers[]).forEach((key) => {
        if (admin?.permissions?.users[key] == 1) {
          setCheckUsers((prevChecks) =>
            prevChecks.map((check, index) =>
              index === permissionUsers[key]
                ? { ...check, isChecked: true }
                : check,
            ),
          );
        }
      });
      (Object.keys(permissionCategories) as PermissionCategories[]).forEach(
        (key) => {
          if (admin?.permissions?.categories[key] == 1) {
            setCheckCategories((prevChecks) =>
              prevChecks.map((check, index) =>
                index === permissionCategories[key]
                  ? { ...check, isChecked: true }
                  : check,
              ),
            );
          }
        },
      );
      (Object.keys(permissionContact) as PermissionContact[]).forEach((key) => {
        if (admin?.permissions?.contact[key] == 1) {
          setCheckSupport((prevChecks) =>
            prevChecks.map((check, index) =>
              index === permissionContact[key]
                ? { ...check, isChecked: true }
                : check,
            ),
          );
        }
      });
      (Object.keys(permissionRequests) as PermissionRequests[]).forEach(
        (key) => {
          if (admin?.permissions?.requests[key] == 1) {
            setCheckRequests((prevChecks) =>
              prevChecks.map((check, index) =>
                index === permissionRequests[key]
                  ? { ...check, isChecked: true }
                  : check,
              ),
            );
          }
        },
      );
      (Object.keys(permissionReports) as PermissionReports[]).forEach((key) => {
        if (admin?.permissions?.reports[key] == 1) {
          setCheckReports((prevChecks) =>
            prevChecks.map((check, index) =>
              index === permissionReports[key]
                ? { ...check, isChecked: true }
                : check,
            ),
          );
        }
      });
      (Object.keys(permissionBanlist) as PermissionBanlist[]).forEach((key) => {
        if (admin?.permissions?.banlist[key] == 1) {
          setCheckBanlist((prevChecks) =>
            prevChecks.map((check, index) =>
              index === permissionBanlist[key]
                ? { ...check, isChecked: true }
                : check,
            ),
          );
        }
      });
    }
  }, [admin?.permissions]);
  return (
    <div>
      {/* <Breadcrumb
        pageName={t('admins.edit')}
        breadcrumbLinks={breadcrumbLinks}
      /> */}
      {!adminId && (
        <div
          className="p-5 text-sm text-blue-800 rounded-lg bg-Input-green dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          {t('alert')}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={!adminId && validationSchema}
        onSubmit={handleAddAdminSubmit}
        enableReinitialize
      >
        {({
          isSubmitting,
          values,
          setFieldValue,
        }: FormikProps<AddAdminValues>) => {
          setpermissions(values.permissions);
          const result = logValues(permissions);
          setLoggedValues(result);
          return (
            <Form className="bg-secondaryBG-light dark:bg-secondaryBG-dark p-6 rounded-sm">
              <div className="md:flex justify-between md:mb-16">
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkAdvertisments}
                  setChecks={setCheckAdvertisments}
                  label={t('admins.form.advertisments')}
                />
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkUsers}
                  setChecks={setCheckUsers}
                  label={t('admins.form.users')}
                />
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkRequests}
                  setChecks={setCheckRequests}
                  label={t('admins.form.requests')}
                />
              </div>
              <div className="md:flex justify-between md:mb-16">
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkSupport}
                  setChecks={setCheckSupport}
                  label={t('admins.form.support')}
                />
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkReports}
                  setChecks={setCheckReports}
                  label={t('admins.form.reports')}
                />
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkBanlist}
                  setChecks={setCheckBanlist}
                  label={t('admins.form.banlist')}
                />
              </div>
              <div className="md:flex justify-between md:mb-16">
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkPermissions}
                  setChecks={setCheckPermissions}
                  label={t('admins.form.permissions')}
                />
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkCategories}
                  setChecks={setCheckCategories}
                  label={t('admins.form.categories')}
                />
              </div>

              <div className="md:flex justify-between md:mb-6">
                <SelectLevel name={`type`} />
                <InputText
                  type={`text`}
                  name={`name`}
                  label={t('admins.form.name')}
                />
                <InputText
                  type={`text`}
                  name={`username`}
                  label={t('admins.form.userName')}
                />
                <InputText
                  type={`text`}
                  name={`phone`}
                  label={t('admins.form.phone')}
                />
              </div>
              <div className="md:flex justify-between md:mb-16">
                <InputText
                  type={`email`}
                  name={`email`}
                  label={t('admins.form.email')}
                />
                {!adminId && (
                  <InputText
                    type={`password`}
                    name={`password`}
                    label={t('admins.form.Password')}
                  />
                )}
                <SelectTime
                  name={`start_working_hour`}
                  label={t('admins.form.from')}
                />
                <SelectTime
                  name={`finish_working_hour`}
                  label={t('admins.form.to')}
                />
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-3xl bg-SaveIconBg text-white rounded-md p-2"
                >
                  <img src="./../../../save.svg" alt="" />
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
