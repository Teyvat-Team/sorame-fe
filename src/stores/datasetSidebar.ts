import { atom } from 'recoil';

export type DatasetSidebarState = {
  isExpanded: boolean;
  filterVal: string;
};

const initialState: DatasetSidebarState = {
  isExpanded: true,
  filterVal: '',
};

export const datasetSidebarState = atom({
  key: 'datasetSidebarState',
  default: initialState,
});
