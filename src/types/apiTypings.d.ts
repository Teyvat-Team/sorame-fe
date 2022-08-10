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

  /************* datasource service **************/

  export interface ListResponse {
    data: DataSourceItem[];
    baseResp: BaseResp | undefined;
  }

  export interface DataSourceItem {
    dataSourceName: string;
    dataSourceType: string;
  }

  export interface DataSource {}

  /************* dataset service **************/

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
    /** 所有数据集 */
    data: DataSetListResponseData[];
    baseResp: BaseResp | undefined;
  }

  /** 单个数据集 */
  export interface DataSetListResponseData {
    /** 一个数据集下的所有的表，数组长度为表的个数 */
    dataSetList: DataSetList[];
    /** 数据集总数 */
    totalCount: number;
  }

  /** 数据集下的单张表 */
  export interface DataSetList {
    /** dataset createTime, timestamp in ms */
    createTime: string;
    /** dataset name */
    name: string;
    /** dataset description */
    descr: string;
    /** dataset source type */
    dataSourceType: string;
    /** dataset id 数据集id */
    id: string;
    /** dataset createUser */
    createUser: string;
    /** database name from where the table created */
    dbName: string;
    /** table name */
    tableName: string;
    /** table id */
    tableId: string;
    /** table schema */
    schema: Schema[];
  }

  export interface Schema {
    name: string;
    type: string;
    descr: string;
    isPartition: boolean;
  }
}
