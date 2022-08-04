import { createContext, ReactNode } from 'react';
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosTransformer,
} from 'axios';
import { message } from 'antd';
import { useContext } from 'react';
import { createBrowserHistory } from 'history';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import to from 'await-to-js';

interface AnyInterface {
  [key: string]: any;
}

type AnyProps = Record<string, unknown> | AnyInterface;

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '',
  timeout: 1000,
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

const useGet = <P extends AnyProps = {}, R extends AnyProps = {}>(
  key: string,
  url: string,
  params?: P,
  axiosRequestConfig?: AxiosRequestConfig,
  queryOptions?: Omit<
    UseQueryOptions<R, AxiosError<API.ErrorData>>,
    'queryKey' | 'queryFn'
  >
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

const usePost = <P extends AnyProps = {}, R extends AnyProps = {}>(
  url: string,
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
  });
};

const usePatch = <P extends AnyProps = {}, R extends AnyProps = {}>(
  url: string,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const axios = useAxios();
  return useMutation(async (item: P) => {
    const [err, data] = await to<R, AxiosError<API.ErrorData>>(
      axios.patch<P, R>(`${url}`, item, axiosRequestConfig)
    );
    if (err) {
      throw err;
    }
    return data;
  });
};

const useDelete = <P extends AnyProps = {}, R extends AnyProps = {}>(
  url: string,
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
  });
};

export { useGet, usePost, usePatch, useDelete };

export default axios;
