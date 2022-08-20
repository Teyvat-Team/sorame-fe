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
  sortInfo: API.Sort[];
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
  tableVisualizationSettings: {
    bordered: boolean;
    resizable: boolean;
    showHeader: boolean;
    size: 'default' | 'middle' | 'small';
  };
};

const initialState: DataTableState = {
  filterString: '',
  fieldListMatrixList: [],
  fieldListDimensionList: [],
  sortInfo: [],
  selectedGraphType: 'table',
  tableInfo: undefined,
  searchInfo: {
    data: undefined,
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: undefined,
  },
  tableVisualizationSettings: {
    bordered: false,
    resizable: false,
    showHeader: true,
    size: 'default',
  },
};

export const dataTableState = atom({
  key: 'dataTableState',
  default: initialState,
});
