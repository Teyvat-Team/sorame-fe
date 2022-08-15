import { atom } from 'recoil';

export type DataTableState = {
  filterString: string;
  fieldListMatrixList: API.MetricList[];
  fieldListDimensionList: API.DimensionList[];
};

const initialState: DataTableState = {
  filterString: '',
  fieldListMatrixList: [],
  fieldListDimensionList: [],
};

export const dataTableState = atom({
  key: 'dataTableState',
  default: initialState,
});
