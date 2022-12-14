import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { datasetSidebarState } from '@/stores/datasetSidebar';
import { COLOR_PALETTE } from '@/const/theme/color';
import { Button, message, Tree } from 'antd';
import Loading from '@/components/illustration/loading';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import { useGetDataSet } from '@/api';
import { motion, AnimatePresence } from 'framer-motion';
import TreeWithoutFilter from './components/treeWithoutFilter';
import { userState } from '@stores/user';
import DatasetFilter from './components/datasetFilter';
import { useDebounce } from 'ahooks';
import { overviewState } from '@stores/overview';
import { deleteNilVal } from '@/tools';
import { useNavigate } from 'react-router';
import { DataNode } from 'antd/lib/tree';
import Empty from '@components/illustration/empty';
import NewDatasetModal from '@components/newDatasetModal';
import { IconPlus } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';

const { useRef, useState, useEffect, useMemo, useCallback } = React;

const Container = styled.section`
  overflow-y: hidden;
  overflow-x: hidden;
  height: calc(100vh - 280px);
  border-top: 1px solid ${COLOR_PALETTE.SORAME_HEADER_SEARCH_BG};
  padding: 16px;
  padding-left: 0;
  padding-right: 0;
  width: 210px;
  margin-bottom: 12px;
  word-break: break-all;
  transition: all 0.3s;
`;

interface DatasetTreeProps {}

const DatasetTree: React.FC<DatasetTreeProps> = (props: DatasetTreeProps) => {
  const {} = props;

  const user = useRecoilValue(userState);

  const { filterVal, isExpanded } = useRecoilValue(datasetSidebarState);

  const debouncedFilterVal = useDebounce(filterVal, { wait: 700 });

  const { needRefresh, datasetFilterVal } = useRecoilValue(overviewState);

  const isDebounceEqual = debouncedFilterVal === filterVal;

  let enableRequest = isDebounceEqual;

  const navigate = useNavigate();

  const [getDataSetReqParams, setGetDataSetReqParams] = useState({
    enableRequest: enableRequest,
    onSuccess: () => {
      if (enableRequest) {
        enableRequest = false;
      }
    },
    onError: (err: API.ErrorResp) => {
      message.error(
        `????????????????????????????????????${
          err?.response?.data?.error || err?.message || '????????????'
        }`
      );
      if (enableRequest) {
        enableRequest = false;
      }
    },
  });

  const { keyword, createUser } = datasetFilterVal;

  const userStore = useRecoilValue(userState);

  const { username = 'admin' } = userStore;

  const { isLoading, isSuccess, isError, data, error, refetch } = useGetDataSet(
    deleteNilVal({
      keyword: debouncedFilterVal?.trim?.() || '',
      createUser: username || 'admin',
    }) as API.DataSetListRequest,
    {
      enabled: getDataSetReqParams?.enableRequest,
      retry: false,
      staleTime: 1000 * 2, // 10s
      onSuccess: getDataSetReqParams?.onSuccess,
      onError: getDataSetReqParams?.onError,
    }
  );

  if (needRefresh) {
    refetch();
  }

  return (
    <>
      <AnimatePresence>
        {isExpanded ? (
          <>
            <Container>
              <DatasetFilter></DatasetFilter>
              {isLoading && (
                <section
                  css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 64px;
                  `}
                >
                  <Loading></Loading>
                </section>
              )}
              {isError && (
                <ErrorIllustrator
                  desc={`???????????????${
                    error?.response?.data?.error || error?.message
                  }`}
                />
              )}
              {isSuccess && (
                <>
                  {(!data?.data?.length || data.data?.length === 0) && (
                    <Empty title="????????????" desc="?????????????????????"></Empty>
                  )}
                  <TreeWithoutFilter
                    data={data?.data || []}
                    onSelect={(item: DataNode) => {
                      const { datasetId, key, title = '' } = item;
                      if (typeof datasetId !== 'string' || datasetId === '') {
                        message.error('?????????id?????????');
                        return;
                      }
                      if (typeof key !== 'string' || key === '') {
                        message.error('?????????id?????????');
                        return;
                      }
                      navigate(`/dataset/${datasetId}/datasetTable/${title}`);
                    }}
                  ></TreeWithoutFilter>
                </>
              )}
            </Container>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default DatasetTree;
