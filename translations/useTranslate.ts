import type { LocaleResource } from '@specfocus/view-focus.i18n/translations/Locale';
import { Translator } from '@specfocus/view-focus.i18n/translations/TranslationContext';
import { useTranslation } from 'react-i18next';

// https://jaysoo.ca/2014/03/20/i18n-with-es2015-template-literals/

const changeLocale = (_locale: LocaleResource) => Promise.resolve();
const getLocale = () => 'en';

export const useTranslate = (
): Translator => {
  const { t } = useTranslation();

  return {
    changeLocale,
    getLocale,
    translate: t,
  };
};
