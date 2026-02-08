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
        className={({ isActive: active }) =>
          `block rounded-lg px-3 py-2 text-[15px] font-[400] text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white ${
            active ? 'bg-white/15 text-white font-[500]' : ''
          }`
        }
      >
        {t(text)}
      </NavLink>
    </li>
  );
}