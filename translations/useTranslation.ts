import type { UseTranslationOptions, UseTranslationResult } from '@specfocus/view-focus.i18n/translations/Translation';
import { useTranslation as useI18nextTranslation } from 'react-i18next';

export const useTranslation = (ns?: string, options?: UseTranslationOptions): UseTranslationResult => {
  const { t, ready } = useI18nextTranslation(ns, options);
  return [t, ready];
};