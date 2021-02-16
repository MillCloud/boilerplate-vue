import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n';
import elementPlusEnLocales from 'element-plus/lib/locale/lang/en';
import elementPlusZhHansLocales from 'element-plus/lib/locale/lang/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';

const elementPlusI18n = {
  en: {
    el: elementPlusEnLocales.el,
  },
  'zh-Hans': {
    el: elementPlusZhHansLocales.el,
  },
};

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages(): LocaleMessages<VueMessageType> {
  const locales = require.context('./locales', true, /[\s\w,-]+\.json$/i);
  const messages: LocaleMessages<VueMessageType> = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([\w-]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = {
        ...locales(key).default,
        // https://stackoverflow.com/questions/58811860/no-index-signature-with-a-parameter-of-type-string-was-found-on-type
        ...elementPlusI18n[locale as keyof typeof elementPlusI18n],
      };
    }
  });
  return messages;
}

export default createI18n({
  legacy: false,
  locale:
    localStorage.getItem('language') ||
    process.env.VUE_APP_I18N_LOCALE ||
    'zh-Hans',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh-Hans',
  messages: loadLocaleMessages(),
});
