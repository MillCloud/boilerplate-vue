/* eslint-disable import/prefer-default-export */
import axios, { AxiosRequestConfig } from 'axios';
import { useAxios as useIntegrationsAxios } from '@vueuse/integrations';
import packageInfo from '@/../package.json';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToken } from './useToken';

declare interface IRequestConfig extends AxiosRequestConfig {
  showError?: boolean;
}

const { t } = useI18n();
const router = useRouter();

const reLaunchCodes = new Set(['TOKEN_OUTDATED']);

const objectStatusCode: { [propName: string]: string } = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  405: 'METHOD_NOT_ALLOWED',
  406: 'NOT_ACCEPTABLE',
  407: 'PROXY_AUTHENTICATION_REQUIRED',
  408: 'REQUEST_TIMEOUT',
  409: 'CONFLICT',
  410: 'GONE',
  411: 'LENGTH_REQUIRED',
  412: 'PRECONDITION_FAILED',
  413: 'PAYLOAD_TOO_LARGE',
  414: 'URI_TOO_LONG',
  415: 'UNSUPPORTED_MEDIA_TYPE',
  416: 'RANGE_NOT_SATISFIABLE',
  417: 'EXPECTATION_FAILED',
  421: 'MISDIRECTED_REQUEST',
  422: 'UNPROCESSABLE_ENTITY',
  423: 'LOCKED',
  424: 'FAILED_DEPENDENCY',
  426: 'UPGRADE_REQUIRED',
  428: 'PRECONDITION_REQUIRED',
  429: 'TOO_MANY_REQUESTS',
  431: 'REQUEST_HEADER_FIELDS_TOO_LARGE',
  451: 'UNAVAILABLE_FOR_LEGAL_REASONS',
  500: 'INTERNAL_SERVER_ERROR',
  501: 'NOT_IMPLEMENTED',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE',
  504: 'GATEWAY_TIMEOUT',
  505: 'HTTP_VERSION_NOT_SUPPORTED',
  506: 'VARIANT_ALSO_NEGOTIATES',
  507: 'INSUFFICIENT_STORAGE',
  508: 'LOOP_DETECTED',
  510: 'NOT_EXTENDED',
  511: 'NETWORK_AUTHENTICATION_REQUIRED',
};

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

const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.Vue_APP_BASE_URL || '',
  timeout: JSON.parse(process.env.VUE_APP_TIMEOUT || '10000') || 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Version': `${packageInfo.name}/${packageInfo.version}`,
  },
  withCredentials: false,
  responseType: 'json',
  validateStatus: handleValidateStatusCode,
};

axios.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    'X-Token': useToken().token.value,
  },
}));

axios.interceptors.response.use(
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
        response.message = objectStatusCode[status]
          ? t(`error.${objectStatusCode[status]}`)
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
  return useIntegrationsAxios<IResponse>(url, { ...defaultConfig, ...config });
}
