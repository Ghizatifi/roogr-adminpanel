import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const availableLanguages = ["en", "ar"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ar",
    supportedLngs: availableLanguages,

    // Important: indique où sont les JSON
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    ns: ["translation"],
    defaultNS: "translation",

    detection: {
      order: ["navigator", "htmlTag", "path", "subdomain"],
      checkWhitelist: true, // OK (ancienne option), mais voir remarque ci-dessous
      // recommended modern key:
      // checkSupportedLngs: true,
    },

    interpolation: {
      escapeValue: false,
    },

    debug: true,
  });

export default i18n;
