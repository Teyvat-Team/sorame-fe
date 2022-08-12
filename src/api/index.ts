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
    '/datasource/list',
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
    '/dataset/list',
    '/dataset/list',
    params,
    queryOption || {}
  );

export const useGetDataSourceTable = (
  params: API.TableRequest,
  queryOption?: Omit<
    UseQueryOptions<API.TableResponse, API.ErrorResp>,
    'queryKey' | 'queryFn'
  >
) =>
  useGet<API.TableRequest, API.TableResponse>(
    '/table/list',
    '/table/list',
    params,
    queryOption || {}
  );

export const useGetTableSchema = (
  params: API.TableSchemaRequest,
  queryOption?: Omit<
    UseQueryOptions<API.TableSchemaResponse, API.ErrorResp>,
    'queryKey' | 'queryFn'
  >
) =>
  useGet<API.TableSchemaRequest, API.TableSchemaResponse>(
    '/table/schema',
    '/table/schema',
    params,
    queryOption || {}
  );
