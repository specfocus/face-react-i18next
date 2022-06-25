import { useTranslation } from 'react-i18next';
import { type UseTranslationOptions, UseTranslationResult } from '@specfocus/view-focus.i18n/i18n/i18next-plugin';

export default (ns?: string, options?: UseTranslationOptions): UseTranslationResult => {
  const { t, ready } = useTranslation(ns, options);
  return [t, ready];
}