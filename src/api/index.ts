import { AxiosError, AxiosResponse } from 'axios';
import { UseQueryOptions } from 'react-query';
import { useGet } from './request';

export const useGetDataSource = (
  queryOption?: Omit<
    UseQueryOptions<API.ListResponse, API.ErrorResp>,
    'queryKey' | 'queryFn'
  >
) =>
  useGet<{}, API.ListResponse>(
    'DataSource',
    '/datasource/list',
    {},
    {},
    queryOption || {}
  );
