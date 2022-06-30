import i18n, { changeLanguage, init, use, type TFunction, type InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
// import intervalPlural from 'i18next-intervalplural-postprocessor';
import type { Locale, LocaleResource, LocaleResources } from '@specfocus/view-focus.i18n/translations/Locale';
import { Translator } from '@specfocus/view-focus.i18n/translations/TranslationContext';
import Polyglot from 'i18next-polyglot';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';

// https://jaysoo.ca/2014/03/20/i18n-with-es2015-template-literals/

use(I18NextHttpBackend);
use(LanguageDetector);
use(Polyglot);
// use(intervalPlural) // https://www.i18next.com/translation-function/plurals#interval-plurals
use(initReactI18next); // passes i18n down to react-i18next

init({});

export interface RegisterTranslationOptions extends InitOptions {
  browser?: boolean;
}

/**
 *
 * @param options
 */
export const registerTranslations = ({
  browser,
  ...options
}: RegisterTranslationOptions = {
    browser: true,
    defaultNS: 'general',
    fallbackLng: 'en',
    ns: ['general']
  }) =>
  init({
    ...options
  });

export type ResourcesPool = (
  locale: string
) => PromiseLike<LocaleResources>;

const CONSTANT = (key: string): string => key;

export const useTranslator = (
  fallbackLocale: Locale = 'en',
  pullResources?: ResourcesPool,
): Translator => {
  const [translate, update] = useState<TFunction>(CONSTANT);
  const [locale, setLocale] = useState<Locale>(fallbackLocale);
  // const { t } = useTranslation();

  const changeLocale = useCallback(
    (lng: Locale) => {
      setLocale(lng);
      return changeLanguage(lng).then(update);
    },
    [setLocale, update],
  );

  const getLocale = useCallback(
    () => locale,
    [locale],
  );

  return {
    changeLocale,
    getLocale,
    translate,
  };
};

export default i18n;