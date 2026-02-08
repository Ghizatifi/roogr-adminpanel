import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arTranslation from './locales/ar/translation.json';
import enTranslation from './locales/en/translation.json';

const initialLng = localStorage.getItem('language') || 'ar';

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: initialLng,
  fallbackLng: 'ar',
  resources: {
    ar: { translation: arTranslation },
    en: { translation: enTranslation },
  },
});

export default i18n;
