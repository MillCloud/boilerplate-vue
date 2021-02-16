import { App } from 'vue';
import ElementPlus from 'element-plus';
import i18n from '@/i18n';

export default (app: App) => {
  app.use(ElementPlus, {
    i18n: i18n.global.t,
  });
};
