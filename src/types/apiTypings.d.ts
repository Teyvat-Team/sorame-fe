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

  export interface CreateDatasetRequest {
    createTableList: CreateTableList[];
  }

  export interface CreateTableList {
    /** 数据集名称 */
    name: string;
    /** 数据集描述 */
    descr: string;
    /** 数据源名称 */
    dataSourceName: string;
    /** 数据库名称 */
    dbName: string;
    /** 表 id */
    tableId: string;
    /** 创建用户 */
    createUser: string;
    /** 维度和指标 */
    attr: Attr | undefined;
  }

  export interface Attr {
    dimension: string[];
    matrix: string[];
  }

  export interface CreateDatasetResponse {
    data: Data | undefined;
    baseResp: BaseResp | undefined;
  }

  export interface Data {
    dataSetId: string;
  }

  export interface DeleteDatasetRequest {
    /** 数据集id */
    id: string;
  }

  export interface DeleteDatasetResponse {
    data: boolean;
    baseResp: BaseResp | undefined;
  }

  /** search service **************************/

  export interface SearchInterfaceRequest {
    datasetId: string;
    tableId: string;
    cache: boolean;
    selectList: SelectList[];
    whereCause: string;
    groupByList: string[];
    sort: Sort[];
  }

  export interface SearchInterfaceResponse {
    cost: string;
    sql: string;
    data: Table[];
    baseResp: BaseResp | undefined;
  }

  export interface SelectList {
    function: string;
    field: string;
  }

  export interface Table {
    row: Row[];
  }

  export interface Sort {
    field: string;
    order: string;
  }

  export interface Row {
    key: string;
    value: string;
  }

  /** table service *************************/
  export interface TableRequest {
    /** 数据源名称（数据源名称需要唯一，否则需要一个id） */
    dataSourceName: string;
  }

  export interface TableResponse {
    data: TableList[];
    baseResp: BaseResp | undefined;
  }

  export interface TableList {
    dbName: string;
    dbTable: DBTable[];
  }

  export interface DBTable {
    tableName: string;
    tableId: string;
  }

  export interface TableSchemaRequest {
    /** 数据源名称 */
    dataSourceName: string;
    /** 数据库名称 */
    dbName: string;
    /** 表 id */
    tableId: string;
  }

  export interface TableSchemaResponse {
    /** 表名 */
    schema: Schema[];
    baseResp: BaseResp | undefined;
  }

  export interface Schema {
    name: string;
    type: string;
    descr: string;
    isPartition: boolean;
  }

  export interface DataTableInfoRequest {
    /** 数据集 id */
    datasetId: string;
    /** 数据表 id */
    dataTableId: string;
  }

  export interface DataTableInfoResponse {
    dimensionList: DimensionList[];
    metricList: MetricList[];
    functionList: FunctionList[];
    baseResp: BaseResp | undefined;
  }

  export interface DimensionList {
    name: string;
    type: string;
    descr: string;
    isPartition: boolean;
  }

  export interface MetricList {
    name: string;
    type: string;
    descr: string;
    isPartition: boolean;
  }

  export interface FunctionList {
    name: string;
    value: string;
  }
}
