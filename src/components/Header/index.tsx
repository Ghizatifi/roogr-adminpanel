import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';
import LanguageSwitcher from './LanguageSwitcher';
import { CiSearch } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
import DropdownNotification from '../notification/DropdownNotification';
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

  const isRtl = language === 'ar';
  // RTL: loupe à droite dans l'input. LTR: miroir = loupe à gauche.
  const searchIconEnd = isRtl;

  return (
    <header
      dir={isRtl ? 'rtl' : 'ltr'}
      className="sticky top-0 z-999 w-full border-b border-[#E6E8F5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-strokedark dark:bg-boxdark/95 dark:shadow-none"
    >
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:px-6 md:h-[60px] 2xl:px-8">
        {/* Left column: empty on desktop, hamburger only on mobile */}
        <div className="flex min-w-0 items-center">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(true);
              props.setIsOpen(true);
            }}
            className="z-99999 flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E8F5] bg-white text-[#374151] transition-colors hover:bg-[#F9FAFF] dark:border-strokedark dark:bg-boxdark dark:text-gray-300 dark:hover:bg-white/10 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Center column: search pill, centered, max-width 360–520px */}
        <div
          className="relative flex min-w-0 justify-center sm:block"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="relative w-full max-w-[min(100%,520px)] min-w-0 sm:min-w-[280px]">
            <CiSearch
              className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#9AA0B8] dark:text-bodydark pointer-events-none ${
                searchIconEnd ? 'right-3 left-auto' : 'left-3 right-auto'
              }`}
            />
            <input
              type="text"
              placeholder={t('header.search')}
              onKeyDown={(e) => handleSearch(e)}
              className="w-full rounded-full border py-2 text-sm text-black outline-none transition-colors placeholder:text-[#9AA0B8] dark:text-white dark:bg-white/5 dark:placeholder:text-bodydark dark:focus:border-[#70F1EB] focus:border-[#3FC2BA] focus:bg-white min-h-[38px] sm:min-h-[42px]"
              style={{
                borderColor: '#E6E8F5',
                backgroundColor: 'rgba(230, 232, 245, 0.2)',
                paddingLeft: searchIconEnd ? '0.75rem' : '2.5rem',
                paddingRight: searchIconEnd ? '2.5rem' : '0.75rem',
              }}
            />
          </div>
        </div>

        {/* Right column: actions (theme, notifications, language, profile) */}
        <ul className="flex shrink-0 list-none items-center justify-end gap-0.5 sm:gap-1">
          <li>
            <DarkModeSwitcher headerOnly />
          </li>
          <DropdownNotification />
          <li className="rounded-full transition-colors hover:bg-[#F9FAFF] dark:hover:bg-white/10">
            <LanguageSwitcher />
          </li>
          {/* Profile icon — désactivé
          <li>
            <Link
              to={adminId ? `/admins/profile/${adminId}` : '/admins'}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#374151] transition-colors hover:bg-[#F9FAFF] hover:text-[#111827] dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white sm:h-10 sm:w-10"
              title={t('admins.profileTitle') || 'Admin profile'}
              aria-label={t('admins.profileTitle') || 'Admin profile'}
            >
              <HiOutlineUserCircle className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            </Link>
          </li>
          */}
        </ul>
      </div>
    </header>
  );
};

export default Header;
