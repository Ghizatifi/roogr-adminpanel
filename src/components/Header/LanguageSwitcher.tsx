import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage, setLanguage } from '../../store/slices/language';
import i18n from '../../i18next';
import { GrLanguage } from 'react-icons/gr';
const en = '/logo/Group 250.svg';
const enDark = '/logo/Group 250dark.svg';

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);

  const handleChangeLanguage = () => {
    let newLanguage: string = language == 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    if (newLanguage === 'en') {
      dispatch(setLanguage(newLanguage));
    } else {
      dispatch(setLanguage(newLanguage));
    }
  };
  return (
    <>
      <button
        onClick={() => handleChangeLanguage()}
        className="flex items-center gap-1 font-bold text-lg dark:text-header-dark
                    text-header-light"
      >
        <GrLanguage className="text-2xl" />
        <span>{language === 'en' ? 'Ar' : 'En'}</span>
      </button>
    </>
  );
}
