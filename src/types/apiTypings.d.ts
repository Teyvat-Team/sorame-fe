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
}
