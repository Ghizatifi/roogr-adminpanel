import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  isOpen: boolean;
  text: string;
  icon: React.ReactNode;
  closeSideBar?: () => void;
}

export default function SidebarLink({
  to,
  isOpen,
  text,
  icon,
  closeSideBar,
}: SidebarLinkProps) {
  const { t } = useTranslation();

  return (
    <li>
      <NavLink
        to={to}
        onClick={closeSideBar}
        className={({ isActive }) =>
          `group relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] font-[400] transition-colors duration-200 rtl:text-right sm:text-[16px] ${
            isOpen ? '' : 'justify-center'
          } ${
            isActive
              ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
              : 'text-[#A5A9C5] hover:bg-gray-100 hover:text-[#3FC2BA] dark:text-bodydark dark:hover:bg-white/5 dark:hover:text-[#3FC2BA]'
          }`
        }
      >
        <span className="shrink-0 text-current">{icon}</span>
        {isOpen && (
          <span className="sidebar-menu-text min-w-0 flex-1 truncate">
            {t(text)}
          </span>
        )}
      </NavLink>
    </li>
  );
}
