import { AxiosError } from 'axios';
import { atom } from 'recoil';

export type SelectedGraphType =
  | 'table'
  | 'barChart'
  | 'lineChart'
  | 'areaChart'
  | 'pieChart';

export type DataTableState = {
  filterString: string;
  fieldListMatrixList: (API.MetricList & {
    function: {
      name: string;
      value: string;
    };
  })[];
  fieldListDimensionList: API.DimensionList[];
  selectedGraphType: SelectedGraphType;
  tableInfo?: API.DataTableInfoResponse;
  searchInfo: {
    data?: API.SearchInterfaceResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error?: AxiosError<API.ErrorData>;
  };
};

const initialState: DataTableState = {
  filterString: '',
  fieldListMatrixList: [],
  fieldListDimensionList: [],
  selectedGraphType: 'table',
  tableInfo: undefined,
  searchInfo: {
    data: undefined,
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: undefined,
  },
};

export const dataTableState = atom({
  key: 'dataTableState',
  default: initialState,
});
