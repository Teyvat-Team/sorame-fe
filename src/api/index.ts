import { AxiosResponse } from 'axios';
import { UseQueryOptions } from 'react-query';
import { useGet } from './request';

export const useGetDataSource = (
  queryOption?: Omit<
    UseQueryOptions<AxiosResponse<API.ListResponse>, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useGet<{}, API.ListResponse>(
    'DataSource',
    '/datasource/list',
    {},
    {},
    queryOption || {}
  );
};
