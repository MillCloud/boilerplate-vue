import axios, { AxiosRequestConfig } from 'axios';
import { useAxios as useIntegrationsAxios } from '@vueuse/integrations';
import pkg from '@@/package.json';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { setupCache } from 'axios-cache-adapter';
import axiosLogger from 'axios-logger';
import axiosRetry from 'axios-retry';
import statuses from 'statuses';
import { constantCase } from '@modyqyw/utils';
import { useToken } from './useToken';

declare interface IRequestConfig extends AxiosRequestConfig {
  showError?: boolean;
  clearCacheEntry?: boolean;
}

const { t } = useI18n();
const router = useRouter();

const reLaunchCodes = new Set(['TOKEN_OUTDATED']);

/** @desc 错误统一处理方法 */
const handleShowError = (response: IResponse) => {
  if (reLaunchCodes.has(response.code)) {
    localStorage.clear();
    router.replace('/');
  } else {
    console.error(response.message);
  }
};

const instance = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_BASE_URL || '',
  timeout: JSON.parse(process.env.VUE_APP_REQUEST_TIMEOUT || '10000') || 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Version': `${pkg.name}/${pkg.version}`,
  },
  adapter: setupCache({
    maxAge: 15 * 60 * 1000,
    invalidate: async (config, request) => {
      if (request.clearCacheEntry) {
        try {
          // @ts-ignore
          await config.store.removeItem(config.uuid);
          // eslint-disable-next-line no-empty
        } catch {}
      }
    },
  }).adapter,
});

instance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    'X-Token': useToken().token.value,
  },
}));
axiosRetry(instance, { retryDelay: axiosRetry.exponentialDelay });
instance.interceptors.request.use(
  (request) => axiosLogger.requestLogger(request, { prefixText: false }),
  axiosLogger.errorLogger,
);

instance.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    if (!data.success && (config as IRequestConfig).showError !== false) {
      handleShowError(data);
    }
    return data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return {
        success: false,
        message: t('error.REQUEST_CANCELLED'),
        code: 'REQUEST_CANCELLED',
      };
    }
    const response: IResponse = {
      success: false,
      code: '',
      message: '',
    };
    if (error.response) {
      // 发送了请求且有响应
      const { status }: { status: number } = error.response;
      if (status < 200 || status >= 300) {
        // 状态码不正常
        try {
          response.code = constantCase(statuses(status) as string);
          response.message = t(
            `error.${constantCase(statuses(status) as string)}`,
          );
        } catch {
          response.code = 'ERROR_OCCURRED';
          response.message = t(`error.ERROR_OCCURRED`);
        }
      } else {
        // 超时
        const timeoutCodes = ['TIMEOUT', 'CONNRESET'];
        const strError = JSON.stringify(error).toUpperCase();
        for (let i = 0, len = timeoutCodes.length; i < len; i += 1) {
          if (strError.includes(timeoutCodes[i])) {
            response.code = 'REQUEST_TIMEOUT';
            response.message = t('error.REQUEST_TIMEOUT');
            break;
          }
        }
      }
    } else if (error.request) {
      // 发送了请求，没有收到响应
      response.code = 'NO_RESPONSE';
      response.message = t('error.NO_RESPONSE');
    } else {
      // 请求时发生错误
      response.code = 'REQUEST_ERROR';
      response.message = t('error.REQUEST_ERROR');
    }
    // 处理错误
    if (error.config.showError !== false) {
      handleShowError(response);
    }
    return response;
  },
);
instance.interceptors.response.use(
  (response) => axiosLogger.responseLogger(response, { prefixText: false }),
  axiosLogger.errorLogger,
);

export function useAxios(url: string, config?: IRequestConfig) {
  return useIntegrationsAxios<IResponse>(url, { ...config }, instance);
}
