import { createApp } from 'vue';
import installPlugins from '@/plugins';
import i18n from '@/i18n';
import store from '@/store';
import router from '@/router';
import App from '@/App.vue';
import '@/styles/global.scss';
import '@/guard';

const app = createApp(App);

installPlugins(app);
app.use(i18n);
app.use(store);
app.use(router);
app.mount('#app');
