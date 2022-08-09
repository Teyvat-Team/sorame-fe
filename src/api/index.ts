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
    queryOption || {}
  );

export const useGetDataSet = (
  params: API.DataSetListRequest,
  queryOption?: Omit<
    UseQueryOptions<API.DataSetListResponse, API.ErrorResp>,
    'queryKey' | 'queryFn'
  >
) =>
  useGet<API.DataSetListRequest, API.DataSetListResponse>(
    'Dataset',
    '/dataset/list',
    params,
    queryOption || {}
  );
