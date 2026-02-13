import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import {
  PiUsersFill,
  PiUsersThreeFill,
  PiTicketFill,
  PiHeadsetFill,
  PiEnvelopeFill,
  PiGearFineFill,
  PiPowerFill,
  PiChartDonutFill,
} from 'react-icons/pi';
import { FaChevronRight, FaChevronDown, FaTimes } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import { MdOutlineBlock } from 'react-icons/md';
import axiosInstance from '../../axiosConfig/instanc';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../store/slices/auth';
import SidebarLink from './SidebarLink';
import DropLink from './DropLink';
import { CollapsedSubmenuPopover, type DropdownListType } from './CollapsedSubmenuPopover';
import { Link } from 'react-router-dom';

const logoLight = '/logo/logoLight.png';
const logoDark = '/logo/logoDark.png';

const HOVER_CLOSE_DELAY_MS = 120;

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, setIsOpen, isOpen }: SidebarProps) => {
  // const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const [dropdownList, setDropdownList] = useState<DropdownListType | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const [hoveredDropdown, setHoveredDropdown] = useState<DropdownListType | null>(null);
  const [popoverAnchorRect, setPopoverAnchorRect] = useState<DOMRect | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null);
      setPopoverAnchorRect(null);
      closeTimeoutRef.current = null;
    }, HOVER_CLOSE_DELAY_MS);
  };
  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };
  const handleCollapsedEnter = (type: DropdownListType, e: React.MouseEvent<HTMLElement>) => {
    cancelClose();
    setPopoverAnchorRect(e.currentTarget.getBoundingClientRect());
    setHoveredDropdown(type);
  };
  const handleCollapsedLeave = () => {
    scheduleClose();
  };
  const closePopover = () => {
    cancelClose();
    setHoveredDropdown(null);
    setPopoverAnchorRect(null);
  };
  const toggleMenu = (type: DropdownListType) => {
    setDropdownList(type);
    setOpen((prev) => (dropdownList === type ? !prev : true));
    if (!isOpen) setIsOpen(true); // expand sidebar si replié pour voir le sous-menu
  };
  const closeSideBar = () => {
    setDropdownList(null);
    setOpen(false);
    setSidebarOpen(false); // ferme l'overlay sur mobile après navigation
  };
  const handleClickOutside = () => {
    setDropdownList(null);
    setOpen(false);
  };
  const fName = localStorage.getItem('first_name');
  const permissions: any = localStorage.getItem('permissions');

  const [permission, setpermission] = useState({
    super: permissions[0],
    charts: permissions[1],
    admins: permissions[2],
    settings: permissions[3],
    ads: {
      all: permissions[4],
      primary: permissions[5],
      subscription: permissions[6],
    },
    users: {
      all: permissions[7],
      advertisers: permissions[8],
      customers: permissions[9],
    },
    categories: {
      primary: permissions[10],
      subscription: permissions[11],
      region: permissions[12],
    },
    requests: { attestation: permissions[13], category: permissions[14] },
    contact: {
      inquiries: permissions[15],
      issues: permissions[16],
      suggestions: permissions[17],
    },
    reports: { chats: permissions[18], products: permissions[19] },
    banlist: { chats: permissions[20], products: permissions[21] },
  });
  useEffect(() => {
    // if (permissions.length === 22) {
    setpermission({
      super: permissions[0],
      charts: permissions[1],
      admins: permissions[2],
      settings: permissions[3],
      ads: {
        all: permissions[4],
        primary: permissions[5],
        subscription: permissions[6],
      },
      users: {
        all: permissions[7],
        advertisers: permissions[8],
        customers: permissions[9],
      },
      categories: {
        primary: permissions[10],
        subscription: permissions[11],
        region: permissions[12],
      },
      requests: { attestation: permissions[13], category: permissions[14] },
      contact: {
        inquiries: permissions[15],
        issues: permissions[16],
        suggestions: permissions[17],
      },
      reports: { chats: permissions[18], products: permissions[19] },
      banlist: { chats: permissions[20], products: permissions[21] },
    });
    // }
  }, []);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const logout = async () => {
    try {
      await axiosInstance.get(`/logout`);
      dispatch(setLogout());
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <aside
        ref={sidebar}
        className={`app-sidebar flex h-screen shrink-0 flex-col rounded-r-xl border-r border-gray-200 bg-white shadow-card duration-300 ease-in-out dark:border-gray-700 dark:bg-secondaryBG-dark dark:shadow-none
          ${isOpen ? 'w-[min(100vw,280px)] sm:w-[260px]' : 'w-0'}
          absolute left-0 top-0 z-9999 rtl:left-auto rtl:right-0 rtl:rounded-l-xl rtl:rounded-r-none rtl:border-r-0 rtl:border-l rtl:border-l-gray-200 dark:rtl:border-l-gray-700
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'}
          ${!isOpen ? 'sidebar-collapsed' : ''}`}
      >
        {/* Top: flèche + icône + logo à gauche */}
        <div className="flex min-h-[3.5rem] shrink-0 items-center gap-2 px-3 pt-2 pb-3 sm:px-4 md:pt-3 md:pb-4 md:px-4">
          <button
            type="button"
            aria-label={isOpen ? 'Réduire le menu' : 'Agrandir le menu'}
            className="hidden shrink-0 rounded-[10px] bg-gray-100 p-2 text-[#A5A9C5] transition-all duration-300 hover:bg-[#F9FAFF] hover:text-[#3FC2BA] dark:bg-white/10 dark:text-bodydark dark:hover:bg-white/15 md:block"
            onClick={toggleSidebar}
          >
            <FaChevronRight className={`text-lg transition-transform duration-300 rtl:rotate-180 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <Link
              to="/charts"
              className="flex min-w-0 flex-1 items-center gap-2 truncate text-black dark:text-white sm:flex-initial"
            >
              <img
                src={logoLight}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 object-contain dark:hidden"
              />
              <img
                src={logoDark}
                alt=""
                width={32}
                height={32}
                className="hidden h-8 w-8 shrink-0 object-contain dark:block"
              />
              <span className="truncate text-lg font-bold sm:text-xl md:text-2xl">ROOGR</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fermer le menu"
            className="ml-auto rounded-lg p-2 text-[#A5A9C5] hover:bg-gray-100 hover:text-[#3FC2BA] dark:text-bodydark dark:hover:bg-white/10 md:hidden"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto pb-4">
          <nav className="px-3 sm:px-4 md:px-5">
            <div>
              <ul className="my-4 flex flex-col gap-2 sm:my-6">
                {permission.charts == 1 && (
                  <SidebarLink
                    to={`/charts`}
                    isOpen={isOpen}
                    text={'sidebar.charts'}
                    icon={<PiChartDonutFill className="text-2xl" />}
                    closeSideBar={closeSideBar}
                  />
                )}
                {(permission.ads.all == 1 ||
                  permission.ads.primary == 1 ||
                  permission.ads.subscription == 1) && (
                  <li>
                    <button
                      type="button"
                      onClick={() => (isOpen ? toggleMenu('Ads') : undefined)}
                      aria-haspopup="menu"
                      aria-expanded={!isOpen ? hoveredDropdown === 'Ads' : dropdownList === 'Ads' && open}
                      onMouseEnter={!isOpen ? (e) => handleCollapsedEnter('Ads', e) : undefined}
                      onMouseLeave={!isOpen ? handleCollapsedLeave : undefined}
                      className={`group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[15px] font-[400] rtl:text-right duration-200 ease-out sm:text-[16px] ${
                        dropdownList === 'Ads' && open
                          ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                          : !isOpen && hoveredDropdown === 'Ads'
                            ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                            : 'text-[#A5A9C5] hover:bg-gray-100 hover:text-[#3FC2BA] dark:text-bodydark dark:hover:bg-white/5'
                      } ${!isOpen ? 'justify-center' : ''}`}
                    >
                      <AiFillHome className="text-2xl shrink-0 text-current" />
                      {isOpen && (
                        <>
                          <span className="sidebar-menu-text flex-1">{t('sidebar.ads.ads')}</span>
                          <FaChevronDown
                            className={`shrink-0 text-sm transition-transform duration-200 ${
                              dropdownList === 'Ads' && open ? 'rotate-180' : ''
                            }`}
                          />
                        </>
                      )}
                    </button>
                    {dropdownList === 'Ads' && open && (
                      <ul className="mt-0.5 flex flex-col gap-0.5 border-l-2 border-gray-200 pl-4 ml-2 py-1 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 rtl:ml-0 rtl:mr-2 dark:border-gray-600 animate-[fadeIn_0.2s_ease-out]">
                        {permission.ads.all == 1 && (
                          <DropLink closeSideBar={closeSideBar} to={`/products`} text={'sidebar.ads.all'} />
                        )}
                        {permission.ads.primary == 1 && (
                          <DropLink closeSideBar={closeSideBar} to={`/products/main`} text={'sidebar.ads.main'} />
                        )}
                        {permission.ads.subscription == 1 && (
                          <DropLink closeSideBar={closeSideBar} to={`/products/subscriptions`} text={'sidebar.ads.subscriptions'} />
                        )}
                      </ul>
                    )}
                  </li>
                )}
                {(permission.users.all == 1 ||
                  permission.users.advertisers == 1 ||
                  permission.users.customers == 1) && (
                  <li>
                    <button
                      type="button"
                      onClick={() => (isOpen ? toggleMenu('User') : undefined)}
                      aria-haspopup="menu"
                      aria-expanded={!isOpen ? hoveredDropdown === 'User' : dropdownList === 'User' && open}
                      onMouseEnter={!isOpen ? (e) => handleCollapsedEnter('User', e) : undefined}
                      onMouseLeave={!isOpen ? handleCollapsedLeave : undefined}
                      className={`group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[15px] font-[400] rtl:text-right duration-200 ease-out sm:text-[16px] ${
                        dropdownList === 'User' && open
                          ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                          : !isOpen && hoveredDropdown === 'User'
                            ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                            : 'text-[#A5A9C5] hover:bg-gray-100 hover:text-[#3FC2BA] dark:text-bodydark dark:hover:bg-white/5'
                      } ${!isOpen ? 'justify-center' : ''}`}
                    >
                      <PiUsersFill className="text-2xl shrink-0 text-current" />
                      {isOpen && (
                        <>
                          <span className="sidebar-menu-text flex-1">{t('sidebar.users.users')}</span>
                          <FaChevronDown className={`shrink-0 text-sm transition-transform duration-200 ${dropdownList === 'User' && open ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </button>
                    {dropdownList === 'User' && open && (
                      <ul className="mt-0.5 flex flex-col gap-0.5 border-l-2 border-gray-200 pl-4 ml-2 py-1 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 rtl:ml-0 rtl:mr-2 dark:border-gray-600 animate-[fadeIn_0.2s_ease-out]">
                        {permission.users.all == 1 && <DropLink closeSideBar={closeSideBar} to={`/users`} text={'sidebar.users.all'} />}
                        {permission.users.advertisers == 1 && <DropLink closeSideBar={closeSideBar} to={`/users/advertiser`} text={'sidebar.users.advertisers'} />}
                        {permission.users.customers == 1 && <DropLink closeSideBar={closeSideBar} to={`/users/customer`} text={'sidebar.users.customers'} />}
                      </ul>
                    )}
                  </li>
                )}
                {(permission.categories.primary == 1 ||
                  permission.categories.subscription == 1 ||
                  permission.categories.region == 1) && (
                  <li>
                    <button
                      type="button"
                      onClick={() => (isOpen ? toggleMenu('Categories') : undefined)}
                      aria-haspopup="menu"
                      aria-expanded={!isOpen ? hoveredDropdown === 'Categories' : dropdownList === 'Categories' && open}
                      onMouseEnter={!isOpen ? (e) => handleCollapsedEnter('Categories', e) : undefined}
                      onMouseLeave={!isOpen ? handleCollapsedLeave : undefined}
                      className={`group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[15px] font-[400] rtl:text-right duration-200 ease-out sm:text-[16px] ${
                        dropdownList === 'Categories' && open
                          ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                          : !isOpen && hoveredDropdown === 'Categories'
                            ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                            : 'text-[#A5A9C5] hover:bg-gray-100 hover:text-[#3FC2BA] dark:text-bodydark dark:hover:bg-white/5'
                      } ${!isOpen ? 'justify-center' : ''}`}
                    >
                      <BiSolidCategory className="text-2xl shrink-0 text-current" />
                      {isOpen && (
                        <>
                          <span className="sidebar-menu-text flex-1">{t('sidebar.categories.categories')}</span>
                          <FaChevronDown className={`shrink-0 text-sm transition-transform duration-200 ${dropdownList === 'Categories' && open ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </button>
                    {dropdownList === 'Categories' && open && (
                      <ul className="mt-0.5 flex flex-col gap-0.5 border-l-2 border-gray-200 pl-4 ml-2 py-1 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 rtl:ml-0 rtl:mr-2 dark:border-gray-600 animate-[fadeIn_0.2s_ease-out]">
                        {permission.categories.primary == 1 && <DropLink closeSideBar={closeSideBar} to={`/categories/main`} text={'sidebar.categories.main'} />}
                        {permission.categories.subscription == 1 && <DropLink closeSideBar={closeSideBar} to={`/categories/subscriptions`} text={'sidebar.categories.subscriptions'} />}
                        {permission.categories.region == 1 && <DropLink closeSideBar={closeSideBar} to={`/categories/map`} text={'sidebar.categories.map'} />}
                      </ul>
                    )}
                  </li>
                )}
                {(permission.requests.attestation == 1 ||
                  permission.requests.category == 1) && (
                  <li>
                    <button
                      type="button"
                      onClick={() => (isOpen ? toggleMenu('Subscription') : undefined)}
                      aria-haspopup="menu"
                      aria-expanded={!isOpen ? hoveredDropdown === 'Subscription' : dropdownList === 'Subscription' && open}
                      onMouseEnter={!isOpen ? (e) => handleCollapsedEnter('Subscription', e) : undefined}
                      onMouseLeave={!isOpen ? handleCollapsedLeave : undefined}
                      className={`group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[15px] font-[400] rtl:text-right duration-200 ease-out sm:text-[16px] ${
                        dropdownList === 'Subscription' && open
                          ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                          : !isOpen && hoveredDropdown === 'Subscription'
                            ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                            : 'text-[#A5A9C5] hover:bg-gray-100 hover:text-[#3FC2BA] dark:text-bodydark dark:hover:bg-white/5'
                      } ${!isOpen ? 'justify-center' : ''}`}
                    >
                      <PiTicketFill className="text-2xl shrink-0 text-current" />
                      {isOpen && (
                        <>
                          <span className="sidebar-menu-text flex-1">{t('sidebar.requests.requests')}</span>
                          <FaChevronDown className={`shrink-0 text-sm transition-transform duration-200 ${dropdownList === 'Subscription' && open ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </button>
                    {dropdownList === 'Subscription' && open && (
                      <ul className="mt-0.5 flex flex-col gap-0.5 border-l-2 border-gray-200 pl-4 ml-2 py-1 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 rtl:ml-0 rtl:mr-2 dark:border-gray-600 animate-[fadeIn_0.2s_ease-out]">
                        {permission.requests.attestation == 1 && <DropLink closeSideBar={closeSideBar} to={`/confirm/subscription`} text={'sidebar.requests.attestation'} />}
                        {permission.requests.category == 1 && <DropLink closeSideBar={closeSideBar} to={`/part/subscription`} text={'sidebar.requests.category'} />}
                      </ul>
                    )}
                  </li>
                )}
                {(permission.contact.inquiries == 1 ||
                  permission.contact.issues == 1 ||
                  permission.contact.suggestions == 1) && (
                  <li>
                    <button
                      type="button"
                      onClick={() => (isOpen ? toggleMenu('Support') : undefined)}
                      aria-haspopup="menu"
                      aria-expanded={!isOpen ? hoveredDropdown === 'Support' : dropdownList === 'Support' && open}
                      onMouseEnter={!isOpen ? (e) => handleCollapsedEnter('Support', e) : undefined}
                      onMouseLeave={!isOpen ? handleCollapsedLeave : undefined}
                      className={`group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[15px] font-[400] rtl:text-right duration-200 ease-out sm:text-[16px] ${
                        dropdownList === 'Support' && open
                          ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                          : !isOpen && hoveredDropdown === 'Support'
                            ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                            : 'text-[#A5A9C5] hover:bg-gray-100 hover:text-[#3FC2BA] dark:text-bodydark dark:hover:bg-white/5'
                      } ${!isOpen ? 'justify-center' : ''}`}
                    >
                      <PiHeadsetFill className="text-2xl shrink-0 text-current" />
                      {isOpen && (
                        <>
                          <span className="sidebar-menu-text flex-1">{t('sidebar.support.support')}</span>
                          <FaChevronDown className={`shrink-0 text-sm transition-transform duration-200 ${dropdownList === 'Support' && open ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </button>
                    {dropdownList === 'Support' && open && (
                      <ul className="mt-0.5 flex flex-col gap-0.5 border-l-2 border-gray-200 pl-4 ml-2 py-1 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 rtl:ml-0 rtl:mr-2 dark:border-gray-600 animate-[fadeIn_0.2s_ease-out]">
                        {permission.contact.inquiries == 1 && <DropLink closeSideBar={closeSideBar} to={`/contact-us/inquiries`} text={'sidebar.support.inquiries'} />}
                        {permission.contact.issues == 1 && <DropLink closeSideBar={closeSideBar} to={`/contact-us/issues`} text={'sidebar.support.issues'} />}
                        {permission.contact.suggestions == 1 && <DropLink closeSideBar={closeSideBar} to={`/contact-us/suggestions`} text={'sidebar.support.suggestions'} />}
                      </ul>
                    )}
                  </li>
                )}
                {(permission.reports.chats == 1 ||
                  permission.reports.products == 1) && (
                  <li>
                    <button
                      type="button"
                      onClick={() => (isOpen ? toggleMenu('Reports') : undefined)}
                      aria-haspopup="menu"
                      aria-expanded={!isOpen ? hoveredDropdown === 'Reports' : dropdownList === 'Reports' && open}
                      onMouseEnter={!isOpen ? (e) => handleCollapsedEnter('Reports', e) : undefined}
                      onMouseLeave={!isOpen ? handleCollapsedLeave : undefined}
                      className={`group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[15px] font-[400] rtl:text-right duration-200 ease-out sm:text-[16px] ${
                        dropdownList === 'Reports' && open
                          ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                          : !isOpen && hoveredDropdown === 'Reports'
                            ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                            : 'text-[#A5A9C5] hover:bg-gray-100 hover:text-[#3FC2BA] dark:text-bodydark dark:hover:bg-white/5'
                      } ${!isOpen ? 'justify-center' : ''}`}
                    >
                      <PiEnvelopeFill className="text-2xl shrink-0 text-current" />
                      {isOpen && (
                        <>
                          <span className="sidebar-menu-text flex-1">{t('sidebar.reports.reports')}</span>
                          <FaChevronDown className={`shrink-0 text-sm transition-transform duration-200 ${dropdownList === 'Reports' && open ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </button>
                    {dropdownList === 'Reports' && open && (
                      <ul className="mt-0.5 flex flex-col gap-0.5 border-l-2 border-gray-200 pl-4 ml-2 py-1 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 rtl:ml-0 rtl:mr-2 dark:border-gray-600 animate-[fadeIn_0.2s_ease-out]">
                        {permission.reports.chats == 1 && <DropLink closeSideBar={closeSideBar} to={`/reports/chat`} text={'sidebar.reports.chat'} />}
                        {permission.reports.products == 1 && <DropLink closeSideBar={closeSideBar} to={`/reports/product`} text={'sidebar.reports.product'} />}
                      </ul>
                    )}
                  </li>
                )}
                {(permission.banlist.chats == 1 ||
                  permission.banlist.products == 1) && (
                  <li>
                    <button
                      type="button"
                      onClick={() => (isOpen ? toggleMenu('BanList') : undefined)}
                      aria-haspopup="menu"
                      aria-expanded={!isOpen ? hoveredDropdown === 'BanList' : dropdownList === 'BanList' && open}
                      onMouseEnter={!isOpen ? (e) => handleCollapsedEnter('BanList', e) : undefined}
                      onMouseLeave={!isOpen ? handleCollapsedLeave : undefined}
                      className={`group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[15px] font-[400] rtl:text-right duration-200 ease-out sm:text-[16px] ${
                        dropdownList === 'BanList' && open
                          ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                          : !isOpen && hoveredDropdown === 'BanList'
                            ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
                            : 'text-[#A5A9C5] hover:bg-gray-100 hover:text-[#3FC2BA] dark:text-bodydark dark:hover:bg-white/5'
                      } ${!isOpen ? 'justify-center' : ''}`}
                    >
                      <MdOutlineBlock className="text-2xl shrink-0 text-current" />
                      {isOpen && (
                        <>
                          <span className="sidebar-menu-text flex-1">{t('sidebar.ban-list.ban-list')}</span>
                          <FaChevronDown className={`shrink-0 text-sm transition-transform duration-200 ${dropdownList === 'BanList' && open ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </button>
                    {dropdownList === 'BanList' && open && (
                      <ul className="mt-0.5 flex flex-col gap-0.5 border-l-2 border-gray-200 pl-4 ml-2 py-1 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 rtl:ml-0 rtl:mr-2 dark:border-gray-600 animate-[fadeIn_0.2s_ease-out]">
                        {permission.banlist.chats == 1 && <DropLink closeSideBar={closeSideBar} to={`/Ban/users`} text={'sidebar.ban-list.users'} />}
                        {permission.banlist.products == 1 && <DropLink closeSideBar={closeSideBar} to={`/Ban/products`} text={'sidebar.ban-list.products'} />}
                        {permission.banlist.products == 1 && <DropLink closeSideBar={closeSideBar} to={`/Ban/chats`} text={'sidebar.ban-list.chats'} />}
                      </ul>
                    )}
                  </li>
                )}
                {permission.admins == 1 && (
                  <SidebarLink
                    to={`/admins`}
                    isOpen={isOpen}
                    text={'sidebar.admins'}
                    icon={<PiUsersThreeFill className="text-2xl" />}
                    closeSideBar={closeSideBar}
                  />
                )}
                {permission.settings == 1 && (
                  <SidebarLink
                    to={`/settings`}
                    isOpen={isOpen}
                    text={'sidebar.settings'}
                    icon={<PiGearFineFill className="text-2xl" />}
                    closeSideBar={closeSideBar}
                  />
                )}
              </ul>
            </div>
            <button
              type="button"
              onClick={logout}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E02828] px-4 py-3 text-white font-medium transition-all duration-300 hover:brightness-110 ${
                isOpen ? 'sm:justify-center sm:px-4' : 'w-auto justify-center px-3'
              }`}
            >
              <PiPowerFill className="text-xl shrink-0 sm:text-2xl" />
              {isOpen && <span className="text-[15px] sm:text-[18px]">{t('sidebar.sign-out')}</span>}
            </button>
          </nav>
        </div>
      </aside>

      {!isOpen && (
        <CollapsedSubmenuPopover
          isOpen={hoveredDropdown !== null}
          anchorRect={popoverAnchorRect}
          dropdownType={hoveredDropdown}
          permission={permission}
          onClose={closePopover}
          onMouseEnter={cancelClose}
          onMouseLeave={handleCollapsedLeave}
          closeSideBar={closeSideBar}
        />
      )}
    </>
  );
};

export default Sidebar;
