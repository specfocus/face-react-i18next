import i18n, { type InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
// import intervalPlural from 'i18next-intervalplural-postprocessor';
import Polyglot from 'i18next-polyglot';

export interface RegisterTranslationOptions extends InitOptions {
  browser?: boolean;
}

/**
 *
 * @param options
 */
export const registerTranslationResources = ({
  browser,
  ...options
}: RegisterTranslationOptions = {
    browser: true,
    defaultNS: 'general',
    fallbackLng: 'en',
    ns: ['general']
  }) =>
  i18n
    .use(I18NextHttpBackend)
    .use(LanguageDetector)
    .use(Polyglot)
    // .use(intervalPlural) // https://www.i18next.com/translation-function/plurals#interval-plurals
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      ...options
    });