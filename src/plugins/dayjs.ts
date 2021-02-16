import { App } from 'vue';
import dayjs from 'dayjs';

export default (app: App) => {
  app.config.globalProperties.$dayjs = dayjs;
};
