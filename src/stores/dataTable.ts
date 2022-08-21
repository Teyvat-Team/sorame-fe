import { Pagination } from '@douyinfe/semi-ui';
import { AxiosError } from 'axios';
import { atom } from 'recoil';

export type SelectedGraphType =
  | 'table'
  | 'barChart'
  | 'lineChart'
  | 'areaChart'
  | 'pieChart';

export type Curve =
  | 'basis'
  | 'cardinal'
  | 'catmullRom'
  | 'linear'
  | 'monotoneX'
  | 'monotoneY'
  | 'natural'
  | 'step'
  | 'stepAfter'
  | 'stepBefore';

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
  whereCause: string;
  whereCauseTree: any;
  whereCauseConfig: any;
  tableVisualizationSettings: {
    bordered: boolean;
    resizable: boolean;
    showHeader: boolean;
    size: 'default' | 'middle' | 'small';
  };
  dataPagination: {
    current: number;
    pageSize: number;
    total: number;
    pageSizeOptions: number[];
  };
  barChartVisualizationSettings: {
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    indexBy?: string;
    width: number;
    height: number;
    groupMode: 'stacked' | 'grouped';
  };
  lineChartVisualizationSettings: {
    indexBy: string;
    height: number;
    width: number;
    enablePointLabel: boolean;
    hasLegends: boolean;
    curve: Curve;
    lineWidth: number;
  };
  areaChartVisualizationSettings: {
    indexBy: string;
    height: number;
    width: number;
    enablePointLabel: boolean;
    hasLegends: boolean;
    curve: Curve;
    lineWidth: number;
  };
  pieChartVisualizationSettings: {
    indexBy: string;
    height: number;
    width: number;
    hasLegends: boolean;
  };
};

export const initialState: DataTableState = {
  filterString: '',
  fieldListMatrixList: [],
  fieldListDimensionList: [],
  sortInfo: [],
  whereCause: '',
  whereCauseTree: undefined,
  whereCauseConfig: undefined,
  selectedGraphType: 'table',
  tableInfo: undefined,
  searchInfo: {
    data: undefined,
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: undefined,
  },
  dataPagination: {
    current: 1,
    pageSize: 10,
    total: 0,
    pageSizeOptions: [10, 20, 50, 100, 200, 500],
  },
  tableVisualizationSettings: {
    bordered: false,
    resizable: false,
    showHeader: true,
    size: 'default',
  },
  barChartVisualizationSettings: {
    margin: { top: 60, right: 110, bottom: 60, left: 80 },
    width: 900,
    height: 600,
    groupMode: 'stacked',
  },
  lineChartVisualizationSettings: {
    indexBy: '',
    height: 600,
    width: 800,
    enablePointLabel: false,
    hasLegends: false,
    curve: 'linear',
    lineWidth: 2,
  },
  areaChartVisualizationSettings: {
    indexBy: '',
    height: 600,
    width: 800,
    enablePointLabel: false,
    hasLegends: false,
    curve: 'linear',
    lineWidth: 2,
  },
  pieChartVisualizationSettings: {
    indexBy: '',
    height: 600,
    width: 800,
    hasLegends: false,
  },
};

export const dataTableState = atom({
  key: 'dataTableState',
  default: initialState,
});
