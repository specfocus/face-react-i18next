import { I18nProvider } from '@specfocus/view-focus.i18n/i18n';
import { LocaleResources } from '@specfocus/view-focus.i18n/i18n/i18next-plugin';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

// https://jaysoo.ca/2014/03/20/i18n-with-es2015-template-literals/

export type ResourcesPool = (
  locale: string
) => PromiseLike<LocaleResources>;

/**
 * Build a i18next i18nProvider based on a function returning the messages for a locale
 *
 * @example
 *
 * import { Admin } from '@specfocus/view-focus.mui-demo';
 * import { Resource } from '@specfocus/view-focus.mui/code';
 * import i18nProvider from '@specfocus/view-focus.i18next/providerss';
 * import english from '@specfocus/locales/en/general';
 * import french from '@specfocus/locales/fr/general';
 *
 * const messages = {
 *     fr: french,
 *     en: english,
 * };
 * const i18nProvider = createI18nProvider(locale => messages[locale])
 */
export default (
  pullResources: ResourcesPool,
  fallbackLocale: string = 'en'
): I18nProvider => {
  let _locale = fallbackLocale;
  const messages = pullResources(fallbackLocale);
  if (messages instanceof Promise) {
    throw new Error(
      `The i18nProvider returned a Promise for the messages of the default locale (${fallbackLocale}). Please update your i18nProvider to return the messages of the default locale in a synchronous way.`
    );
  }
 const { t } = useTranslation();
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