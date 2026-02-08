import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';
import LanguageSwitcher from './LanguageSwitcher';
import { CiSearch } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
import DropdownNotification from '../notification/DropdownNotification';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import axiosInstance from '../../axiosConfig/instanc';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}) => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState<string | null>(() =>
    localStorage.getItem('admin_id'),
  );

  useEffect(() => {
    if (adminId != null) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    const fetchCurrentAdmin = async () => {
      try {
        const res = await axiosInstance.get('/me');
        const data = res.data?.data ?? res.data;
        const id = data?.id ?? data?.admin_id ?? data?.user_id;
        if (id != null) {
          const sid = String(id);
          localStorage.setItem('admin_id', sid);
          setAdminId(sid);
        }
      } catch {
        try {
          const res = await axiosInstance.get('/admins/me');
          const data = res.data?.data ?? res.data;
          const id = data?.id ?? data?.admin_id ?? data?.user_id;
          if (id != null) {
            const sid = String(id);
            localStorage.setItem('admin_id', sid);
            setAdminId(sid);
          }
        } catch {
          /* backend may not expose /me or /admins/me */
        }
      }
    };
    fetchCurrentAdmin();
  }, [adminId]);

  const handleSearch = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (
      (event as React.KeyboardEvent).key === 'Enter' ||
      event.type === 'click'
    ) {
      const target = event.target as HTMLInputElement;
      let id;
      if (target.value.toLowerCase().startsWith('rc-')) {
        id = target.value.slice(3);
        navigate(`/reports/chat`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rt-')) {
        id = target.value.slice(3);
        navigate(`/reports/product`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rq1-')) {
        id = target.value.slice(4);
        navigate(`/contact-us/inquiries`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rq2-')) {
        id = target.value.slice(4);
        navigate(`/contact-us/issues`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rfp-')) {
        id = target.value.slice(4);
        navigate(`/contact-us/suggestions`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rd-')) {
        id = target.value.slice(3);
        navigate(`/confirm/subscription`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rs-')) {
        id = target.value.slice(3);
        navigate(`/part/subscription`, { state: { id } });
      } else if (target.value.length == 0) {
        id = target.value;
      } else {
        const userName = target.value;
        navigate('/users', { state: { userName } });
      }
    }
  };

  return (
    <header
      dir="ltr"
      className="sticky top-0 z-999 w-full border-b border-stroke bg-white/95 shadow-sm backdrop-blur dark:border-strokedark dark:bg-boxdark/95"
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6 2xl:px-8">
        {/* Left: hamburger (mobile) + logo */}
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(true);
              props.setIsOpen(true);
            }}
            className="z-99999 flex h-9 w-9 items-center justify-center rounded-lg border border-stroke bg-white text-black shadow-sm transition-colors hover:bg-gray/10 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-white/10 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <DarkModeSwitcher />
        </div>

        {/* Center: search */}
        <div
          className="hidden min-w-0 flex-1 max-w-md sm:block lg:max-w-xl"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="relative">
            <CiSearch
              className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-body dark:text-bodydark ${
                language === 'ar' ? 'left-3' : 'right-3'
              }`}
            />
            <input
              type="text"
              placeholder={t('header.search')}
              onKeyDown={(e) => handleSearch(e)}
              className="w-full rounded-xl border border-stroke bg-gray/30 py-2.5 pl-4 pr-10 text-sm text-black outline-none transition-colors placeholder:text-body focus:border-primary focus:bg-white dark:border-strokedark dark:bg-white/5 dark:text-white dark:placeholder:text-bodydark dark:focus:border-[#70F1EB]"
            />
          </div>
        </div>

        {/* Right: profile, notifications, language — ordre logique */}
        <ul className="flex shrink-0 list-none items-center gap-1 sm:gap-2">
          <li>
            <Link
              to={adminId ? `/admins/profile/${adminId}` : '/admins'}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-body transition-colors hover:bg-gray/20 hover:text-black dark:text-bodydark dark:hover:bg-white/10 dark:hover:text-white sm:h-10 sm:w-10"
              title={t('admins.profileTitle') || 'Admin profile'}
              aria-label={t('admins.profileTitle') || 'Admin profile'}
            >
              <HiOutlineUserCircle className="h-6 w-6 shrink-0" />
            </Link>
          </li>
          <DropdownNotification />
          <li className="rounded-xl transition-colors hover:bg-gray/20 dark:hover:bg-white/10">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
