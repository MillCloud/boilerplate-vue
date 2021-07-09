import axios, { AxiosRequestConfig } from 'axios';
import { useAxios as useIntegrationsAxios } from '@vueuse/integrations';
import packageInfo from '@/../package.json';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axiosRetry from 'axios-retry';
import statuses from 'statuses';
import { constantCase } from '@modyqyw/utils';
import { useToken } from './useToken';

declare interface IRequestConfig extends AxiosRequestConfig {
  showError?: boolean;
}

const { t } = useI18n();
const router = useRouter();

const reLaunchCodes = new Set(['TOKEN_OUTDATED']);

const handleValidateStatusCode = (statusCode: number) =>
  (statusCode >= 200 && statusCode < 300) || statusCode === 304;

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
    'X-Version': `${packageInfo.name}/${packageInfo.version}`,
  },
  withCredentials: false,
  responseType: 'json',
  validateStatus: handleValidateStatusCode,
});

axiosRetry(instance, { retryDelay: axiosRetry.exponentialDelay });

instance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    'X-Token': useToken().token.value,
  },
}));

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
      let { status }: { status: number | string } = error.response;
      if (!handleValidateStatusCode(status as number)) {
        // 状态码不正常
        status = JSON.stringify(status);
        response.code = status;
        response.message = statuses(status)
          ? t(`error.${constantCase(statuses(status).toString())}`)
          : t('error.ERROR_OCCURRED');
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

export function useAxios(url: string, config?: IRequestConfig) {
  return useIntegrationsAxios<IResponse>(url, { ...config }, instance);
}
