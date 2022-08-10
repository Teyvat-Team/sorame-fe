import { atom } from 'recoil';

export type OverviewDatasetFilterVal = {
  keyword: string;
  orderBy?: 'popular' | 'createTime';
  order?: 'asc' | 'desc';
  createUser?: string;
};

export type OverviewState = {
  datasetFilterVal: OverviewDatasetFilterVal;
};

const initialState: OverviewState = {
  datasetFilterVal: {
    keyword: '',
  },
};

export const overviewState = atom({
  key: 'overviewState',
  default: initialState,
});
