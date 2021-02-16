import { App } from 'vue';
import installBus from './bus';
import installDayjs from './dayjs';
import installElementPlus from './element-plus';

export default (app: App) => {
  installBus(app);
  installDayjs(app);
  installElementPlus(app);
};
