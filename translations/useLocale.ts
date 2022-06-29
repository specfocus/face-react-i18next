import type { Locale, LocaleResource, LocaleResources } from '@specfocus/view-focus.i18n/translations/Locale';
import { TranslationContextValue } from '@specfocus/view-focus.i18n/translations/TranslationContext';
import i18n, { TFunction } from 'i18next';
import { useCallback, useEffect, useState } from 'react';

// https://jaysoo.ca/2014/03/20/i18n-with-es2015-template-literals/

export type ResourcesPool = (
  locale: string
) => PromiseLike<LocaleResources>;

const CONSTANT = (key: string): string => key;
const changeLocale = (_locale: LocaleResource) => Promise.resolve();
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
export const useLocale = (
  locale: Locale = 'en',
  pullResources?: ResourcesPool
): TranslationContextValue => {
  const [t, setTranslate] = useState<TFunction>(CONSTANT);
  useEffect(
    () => {
      if (pullResources) {
        const messages = pullResources(locale);
        if (messages instanceof Promise) {
          throw new Error(
            `The pullResources returned a Promise for the messages of the default locale (${locale}). Please update your pullResources to return the messages of the default locale in a synchronous way.`
          );
        }
        Promise.resolve(messages).then(resources =>
          i18n.init({
            fallbackLng: locale,
            resources: {
              [locale]: resources
            }
          }).then(translate => {
            console.log('resources initialization');
            setTranslate(translate);
          })
        );
      } else {
        i18n.init({
          fallbackLng: locale,
        }).then(translate => {
          console.log('without resources initialization');
          setTranslate(translate);
        });
      }
    },
    [locale, pullResources]
  );
  const getLocale = useCallback(
    () => locale,
    [locale],
  )

  return {
    changeLocale,
    getLocale,
    translate: t,
  };
};
