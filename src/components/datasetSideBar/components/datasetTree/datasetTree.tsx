import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { datasetSidebarState } from '@/stores/datasetSidebar';
import { COLOR_PALETTE } from '@/const/theme/color';
import { message, Tree } from 'antd';
import Loading from '@/components/illustration/loading';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import { useGetDataSet } from '@/api';
import { motion, AnimatePresence } from 'framer-motion';
import TreeWithoutFilter from './components/treeWithoutFilter';
import { userState } from '@stores/user';
import DatasetFilter from './components/datasetFilter';
import { useDebounce } from 'ahooks';

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

  const isDebounceEqual = debouncedFilterVal === filterVal;

  let enableRequest = isDebounceEqual;

  const [getDataSetReqParams, setGetDataSetReqParams] = useState({
    enableRequest: enableRequest,
    onSuccess: () => {
      // setGetDataSetReqParams({
      //   ...getDataSetReqParams,
      //   enableRequest: false,
      // });
      if (enableRequest) {
        enableRequest = false;
      }
    },
    onError: (err: API.ErrorResp) => {
      message.error(
        `未找到数据源，错误信息：${
          err?.response?.data?.error || err?.message || '未知错误'
        }`
      );
      // setGetDataSetReqParams({
      //   ...getDataSetReqParams,
      //   enableRequest: false,
      // });
      if (enableRequest) {
        enableRequest = false;
      }
    },
  });

  const { isLoading, isSuccess, isError, data, error } = useGetDataSet(
    {
      createUser: user.username,
      keyword: debouncedFilterVal || '',
    },
    {
      enabled: getDataSetReqParams?.enableRequest,
      retry: false,
      cacheTime: 10000,
      onSuccess: getDataSetReqParams?.onSuccess,
      onError: getDataSetReqParams?.onError,
    }
  );

  const handleItemSelect = useCallback((item: any) => {}, []);

  return (
    <>
      <AnimatePresence>
        {isExpanded ? (
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
                desc={`错误信息：${
                  error?.response?.data?.error || error?.message
                }`}
              />
            )}
            {isSuccess && (
              <TreeWithoutFilter
                data={data?.data || []}
                onSelect={item => {
                  console.log(
                    '%c item >>>',
                    'background: yellow; color: blue',
                    item
                  );
                }}
              ></TreeWithoutFilter>
            )}
          </Container>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default DatasetTree;
