import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage, setLanguage } from '../../store/slices/language';
import i18n from '../../i18n';

/** Même icône langue que la landing page */
const LanguageIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
  </svg>
);

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);

  const handleChangeLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    dispatch(setLanguage(newLanguage));
  };

  return (
    <button
      type="button"
      onClick={handleChangeLanguage}
      className="flex h-9 w-9 items-center justify-center rounded-full text-[#374151] transition-colors hover:bg-[#F9FAFF] hover:text-[#3FC2BA] dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white sm:h-10 sm:w-10"
      title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <LanguageIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
    </button>
  );
}
