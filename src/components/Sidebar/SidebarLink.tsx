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
          `group relative flex items-center gap-2 rounded-[12px] p-2 text-left text-[15px] font-[400] text-white transition-colors duration-200 hover:bg-sidebarHover rtl:text-right sm:gap-2.5 sm:rounded-[15px] sm:p-2.5 sm:text-[16px] md:text-[18px] ${
            isOpen ? '' : 'justify-center'
          } ${isActive ? 'bg-sidebarHover' : ''}`
        }
      >
        <span className="shrink-0">{icon}</span>
        {isOpen && <span className="min-w-0 truncate">{t(text)}</span>}
      </NavLink>
    </li>
  );
}
