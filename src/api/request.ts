import { createContext, ReactNode } from 'react';
import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosTransformer,
} from 'axios';
import { notification } from 'antd';
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

    notification.error({
      message: `请求错误 ${response.statusText}: ${response}`,
      description: data || response.statusText || 'Error',
    });

    if (response.status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(new Error(response.statusText || 'Error'));
  },
  error => {
    console.log('err:', error, error.response); // for debug
    let msg = '请求错误';
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          window.location.href = '/login';

          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          window.location.href = '/login';
          break;
        // 404请求不存在
        case 404:
          notification.error({
            message: `请求不存在`,
            description: error.response.data?.msg || 'Error',
          });
          break;
        case 406:
          notification.error({
            message: `请求参数有误`,
            description: error.response.data?.msg || 'Error',
          });
          break;
        default:
          notification.error({
            message: `请求错误`,
            description: error.response.data?.msg || 'Error',
          });
      }
    }

    // throw new Error(error);
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

const useGet = <
  P extends AnyProps = {},
  R extends AnyProps = {}
>(
  key: string,
  url: string,
  params?: P,
  axiosRequestConfig?: AxiosRequestConfig,
  queryOptions?: Omit<
    UseQueryOptions<AxiosResponse<R>, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  const axios = useAxios();

  const service = async () => {
    const [err, data] = await to(
      axios.get<P, AxiosResponse<R>>(
        url,
        { ...axiosRequestConfig, params: params || {} } || {}
      )
    );

    if (err) {
      throw err;
    }

    return data;
  };
  return useQuery<AxiosResponse<R>, Error>(
    [key, params],
    () => service(),
    queryOptions || {}
  );
};

const usePost = <
  P extends AnyProps = {},
  R extends AnyProps = {}
>(
  url: string,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const axios = useAxios();
  return useMutation(async (params: P) => {
    const [err, data] = await to(
      axios.post<P, AxiosResponse<R>>(`${url}`, params, axiosRequestConfig)
    );
    if (err) {
      throw err;
    }
    return data;
  });
};

const usePatch = <
  P extends AnyProps = {},
  R extends AnyProps = {}
>(
  url: string,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const axios = useAxios();
  return useMutation(async (item: P) => {
    const [err, data] = await to(
      axios.patch<P, AxiosResponse<R>>(`${url}`, item, axiosRequestConfig)
    );
    if (err) {
      throw err;
    }
    return data;
  });
};

const useDelete = <
  P extends AnyProps = {},
  R extends AnyProps = {}
>(
  url: string,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const axios = useAxios();
  return useMutation(async (params: P) => {
    const [err, data] = await to(
      axios.delete<P, AxiosResponse<R>>(url, {
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
