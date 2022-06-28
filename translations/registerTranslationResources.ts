import { type TranslationResources } from '@specfocus/view-focus.i18n/translations/Translation';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

/**
 *
 * @param fallbackLng
 * @param resources
 * @param lng
 */
export default (fallbackLng = 'en', resources?: TranslationResources, lng?: string) => {
  i18n
    .use(I18NextHttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources,
      lng, // if you're using a language detector, do not define the lng option
      fallbackLng,
      interpolation: {
        escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      }
    });
};