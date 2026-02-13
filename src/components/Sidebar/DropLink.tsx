import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

interface DropLinkProps {
  to: string;
  text: string;
  closeSideBar: () => void;
}

export default function DropLink({ to, text, closeSideBar }: DropLinkProps) {
  const { t } = useTranslation();

  return (
    <li>
      <NavLink
        to={to}
        onClick={closeSideBar}
        className={({ isActive }) =>
          `block rounded-lg px-3 py-2 text-[15px] font-[400] transition-colors duration-200 ${
            isActive
              ? 'bg-[#F9FAFF] text-[#3FC2BA] dark:bg-white/10 dark:text-[#3FC2BA]'
              : 'text-[#A5A9C5] hover:bg-gray-100 hover:text-[#3FC2BA] dark:text-bodydark dark:hover:bg-white/5 dark:hover:text-[#3FC2BA]'
          }`
        }
      >
        {t(text)}
      </NavLink>
    </li>
  );
}
