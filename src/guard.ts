/* eslint-disable no-lonely-if */
import nprogress from 'nprogress';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

router.beforeEach(async (to, from, next) => {
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('\r\n');
  //   console.log('to', to);
  //   console.log('from', from);
  //   console.log('\r\n');
  // }
  // 启动 nprogress
  nprogress.start();
  next();
});

router.afterEach(() => {
  // 关闭 nprogress
  nprogress.done();
});
