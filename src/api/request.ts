import { createContext } from 'react';
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { useContext } from 'react';
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import to from 'await-to-js';

interface AnyInterface {
  [key: string]: any;
}

type AnyProps = Record<string, unknown> | AnyInterface;

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '',
  timeout: 20000,
  timeoutErrorMessage: '请求超时过20秒，请稍后再试',
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(config => {
  // Read token for anywhere, in this case directly from localStorage
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response interceptor
axios.interceptors.response.use(
  response => {
    const data = response.data;
    if (response.status === 200) {
      return data;
    }

    if (response.status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(new Error(response.statusText || 'Error'));
  },
  error => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: not login
        case 401:
          window.location.href = '/login';

          break;
        // 403 token expire
        case 403:
          window.location.href = '/login';
          break;
        // 404 request not found
        case 404:
          message.error(
            `请求资源不存在${
              error?.response?.data?.error
                ? `，错误信息：${error?.response?.data?.error}`
                : ''
            }`
          );
          break;
        case 406:
          // request param error, leave it to the business to handle
          break;
        default:
          // other error, leave it to the business to handle
          break;
      }
    }
    return Promise.reject(error);
  }
);

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(axios, {
    apply: () => {
      throw new Error('You must wrap your component in an AxiosProvider');
    },
    get: () => {
      throw new Error('You must wrap your component in an AxiosProvider');
    },
  })
);

export const useAxios = () => {
  return useContext(AxiosContext);
};

/**
 * @description: use get request, common use case is to get data from server
 * @param key
 * @param url
 * @param params
 * @param queryOptions
 * @param axiosRequestConfig
 * @returns {UseQueryResult<R, AxiosError<API.ErrorData>>}
 */
const useGet = <P extends AnyProps = {}, R extends AnyProps = {}>(
  key: string,
  url: string,
  params?: P,
  queryOptions?: Omit<
    UseQueryOptions<R, AxiosError<API.ErrorData>>,
    'queryKey' | 'queryFn'
  >,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const axios = useAxios();

  const service = async () => {
    const [err, data] = await to<R, AxiosError<API.ErrorData>>(
      axios.get<P, R>(
        url,
        { ...axiosRequestConfig, params: params || {} } || {}
      )
    );

    if (err) {
      throw err;
    }

    return data;
  };

  return useQuery<R, AxiosError<API.ErrorData>>(
    [key, params],
    service,
    queryOptions || {}
  );
};

/**
 * @description: use post request, common use case is to add new data to server
 *
 * @template P
 * @template R
 * @param {string} url
 * @param {Omit<
 *     UseMutationOptions<R, unknown, P, unknown>,
 *     'mutationFn'
 *   >} [mutationOptions]
 * @param {AxiosRequestConfig} [axiosRequestConfig]
 * @return {UseMutationResult<R, unknown, P, unknown>}
 */
const usePost = <P extends AnyProps = {}, R extends AnyProps = {}>(
  url: string,
  mutationOptions?: Omit<
    UseMutationOptions<R, unknown, P, unknown>,
    'mutationFn'
  >,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const axios = useAxios();
  return useMutation(async (params: P) => {
    const [err, data] = await to<R, AxiosError<API.ErrorData>>(
      axios.post<P, R>(`${url}`, params, axiosRequestConfig)
    );
    if (err) {
      throw err;
    }
    return data;
  }, mutationOptions || {});
};

/**
 * @description: use put request, common use case is to update/modify data to server
 * @param url
 * @param mutationOptions
 * @param axiosRequestConfig
 * @returns {UseMutationResult<R, unknown, P, unknown>}
 */
const usePut = <P extends AnyProps = {}, R extends AnyProps = {}>(
  url: string,
  mutationOptions?: Omit<
    UseMutationOptions<R, unknown, P, unknown>,
    'mutationFn'
  >,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const axios = useAxios();
  return useMutation(async (item: P) => {
    const [err, data] = await to<R, AxiosError<API.ErrorData>>(
      axios.put<P, R>(`${url}`, item, axiosRequestConfig)
    );
    if (err) {
      throw err;
    }
    return data;
  }, mutationOptions || {});
};

/**
 * @description: use delete request, common use case is to delete data from server
 * @param url
 * @param mutationOptions
 * @param axiosRequestConfig
 * @returns {UseMutationResult<R, unknown, P, unknown>}
 */
const useDelete = <P extends AnyProps = {}, R extends AnyProps = {}>(
  url: string,
  mutationOptions?: Omit<
    UseMutationOptions<R, unknown, P, unknown>,
    'mutationFn'
  >,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const axios = useAxios();
  return useMutation(async (params: P) => {
    const [err, data] = await to<R, AxiosError<API.ErrorData>>(
      axios.delete<P, R>(url, {
        ...axiosRequestConfig,
        params: params || {},
      })
    );
    if (err) {
      throw err;
    }
    return data;
  }, mutationOptions || {});
};

export { useGet, usePost, usePut, useDelete };

export default axios;
