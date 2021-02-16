/* eslint-disable import/prefer-default-export */
import { useLocalStorage } from '@vueuse/core';
import i18n from '@/i18n';

export function useLanguage() {
  const language = useLocalStorage('language', 'zh-Hans');
  const setLanguage = (value: 'zh-Hans' | 'en') => {
    language.value = value;
    i18n.global.locale.value = value;
  };
  return {
    language,
    setLanguage,
  };
}
