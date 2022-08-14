import { atom } from 'recoil';

export type OverviewDatasetFilterVal = {
  keyword: string;
  orderBy?: 'popular' | 'createTime';
  order?: 'asc' | 'desc';
  createUser?: string;
};

export type OverviewState = {
  datasetFilterVal: OverviewDatasetFilterVal;
  needRefresh: boolean;
};

const initialState: OverviewState = {
  datasetFilterVal: {
    keyword: '',
  },
  needRefresh: false,
};

export const overviewState = atom({
  key: 'overviewState',
  default: initialState,
});
