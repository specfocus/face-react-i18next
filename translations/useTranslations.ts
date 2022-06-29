import type { Locale, LocaleResources } from '@specfocus/view-focus.i18n/translations/Locale';
import type { TranslationContextValue } from '@specfocus/view-focus.i18n/translations/TranslationContext';
import { useCallback, useState } from 'react';
import { useLocale } from './useLocale';

// https://jaysoo.ca/2014/03/20/i18n-with-es2015-template-literals/

export type ResourcesPool = (
  locale: string
) => PromiseLike<LocaleResources>;

/**
 * Build a i18next pullResources based on a function returning the messages for a locale
 *
 * @example
 *
 * import { App } from '@specfocus/view-focus.mui-demo';
 * import { Resource } from '@specfocus/view-focus.mui/resources';
 * import pullResources from '@specfocus/view-focus.i18next/providerss';
 * import english from '@specfocus/locales/en/general';
 * import french from '@specfocus/locales/fr/general';
 *
 * const messages = {
 *     fr: french,
 *     en: english,
 * };
 * const TranslationContextValue = provideTranslationContextValue(locale => messages[locale])
 */
export const useTranslations = (
  fallbackLocale: Locale = 'en',
  pullResources?: ResourcesPool,
): TranslationContextValue => {
  const [locale, setLocale] = useState(fallbackLocale);
  const { translate, getLocale } = useLocale(locale, pullResources);
  const changeLocale = useCallback(
    (l: Locale) => {
      setLocale(l);
      return Promise.resolve();
    },
    [setLocale],
  );

  // const { t } = useTranslation();
  return {
    translate,
    changeLocale,
    getLocale
  };
};