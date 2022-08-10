declare namespace API {
  export interface BaseResp {
    code?: number | undefined;
    message?: string | undefined;
  }

  export type ErrorData = {
    error: string;
    status: number;
  };

  export type ErrorResp = AxiosError<ErrorData>;

  export interface ListResponse {
    data: DataSourceItem[];
    baseResp: BaseResp | undefined;
  }

  export interface DataSourceItem {
    dataSourceName: string;
    dataSourceType: string;
  }

  export interface DataSource {}

  export enum OrderBy {
    createTime = 0,
    UNRECOGNIZED = -1,
  }

  export enum Order {
    asc = 0,
    desc = 1,
    UNRECOGNIZED = -1,
  }

  export interface DataSetListRequest {
    createUser: string;
    /** @default = createTime */
    orderBy?: OrderBy | undefined;
    /** @default = desc */
    order?: Order | undefined;
    /** when page and pageSize are not set, it will return all data sets */
    page?: number | undefined;
    pageSize?: number | undefined;
    /** filter for serarching dataset name */
    keyword?: string | undefined;
  }

  export interface DataSetListResponse {
    data: DataSetListResponseData[];
    baseResp: BaseResp | undefined;
  }

  export interface DataSetListResponseData {
    dataSetList: DataSetList[];
    totalCount: number;
  }

  export interface Schema {
    name: string;
    type: string;
    descr: string;
    isPartition: boolean;
  }

  export interface DataSetList {
    /** timestamp in ms */
    createTime: string;
    /** dataset name */
    name: string;
    /** dataset description */
    descr: string;
    /** dataset source type */
    dataSourceType: string;
    /** database name from where the dataset created */
    dbName: string;
    /** table name */
    tableName: string;
    /** table schema */
    schema: Schema[];
    /** dataset id */
    id: string;
    /** dataset createUser */
    createUser: string;
  }
}
