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
};

const initialState: DataTableState = {
  filterString: '',
  fieldListMatrixList: [],
  fieldListDimensionList: [],
  selectedGraphType: 'table',
  tableInfo: undefined,
};

export const dataTableState = atom({
  key: 'dataTableState',
  default: initialState,
});
