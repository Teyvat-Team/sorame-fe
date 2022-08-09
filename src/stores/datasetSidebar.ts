import { atom } from 'recoil';

type DatasetSidebarState = {
  isExpanded: boolean;
};

const initialState: DatasetSidebarState = {
  isExpanded: true,
};

export const datasetSidebarState = atom({
  key: 'datasetSidebarState',
  default: initialState,
});
