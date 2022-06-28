import { TranslationProvider } from '@specfocus/view-focus.i18n/translations/TranslationProvider';
import type { LocaleResources } from '@specfocus/view-focus.i18n/translations/Locale';
import i18n from 'i18next';
import { useTranslation as useI18nextTranslation } from 'react-i18next';

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
 * const TranslationProvider = createTranslationProvider(locale => messages[locale])
 */
export const createTranslationProvider = (
  pullResources: ResourcesPool,
  fallbackLocale: string = 'en'
): TranslationProvider => {
  let _locale = fallbackLocale;
  const messages = pullResources(fallbackLocale);
  if (messages instanceof Promise) {
    throw new Error(
      `The pullResources returned a Promise for the messages of the default locale (${fallbackLocale}). Please update your pullResources to return the messages of the default locale in a synchronous way.`
    );
  }
 const { t } = useI18nextTranslation();
  return {
    translate: (key: string, options: any = {}) => t(key, options),
    changeLocale: (locale: string) =>
      // We systematically return a Promise for the messages because
      // pullResources may return a Promise
      Promise.resolve(pullResources(locale)).then(
        (resources: LocaleResources) => {
          _locale = locale;
          i18n.init({
            fallbackLng: fallbackLocale,
            lng: locale,
            resources: {
              [locale]: resources
            }
          });
        }
      ),
    getLocale: () => _locale,
  };
};