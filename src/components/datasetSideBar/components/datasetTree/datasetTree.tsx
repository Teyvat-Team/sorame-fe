import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { datasetSidebarState } from '@/stores/datasetSidebar';
import { COLOR_PALETTE } from '@/const/theme/color';
import { message, Tree } from 'antd';
import Loading from '@/components/illustration/loading';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import { useGetDataSet } from '@/api';
import { motion, AnimatePresence } from 'framer-motion';
import TreeWithoutFilter from './components/treeWithoutFilter';
import { userState } from '@stores/user';

const { useRef, useState, useEffect, useMemo, useCallback } = React;

const Container = styled.section`
  overflow-y: hidden;
  overflow-x: hidden;
  height: calc(100vh - 280px);
  border-top: 1px solid ${COLOR_PALETTE.SORAME_HEADER_SEARCH_BG};
  padding: 16px;
  width: 210px;
  margin-bottom: 12px;
  word-break: break-all;
  transition: all 0.3s;
`;

interface DatasetTreeProps {}

const DatasetTree: React.FC<DatasetTreeProps> = (props: DatasetTreeProps) => {
  const {} = props;

  const [getDataSetReqParams, setGetDataSetReqParams] = useState({
    enableRequest: true,
    onSuccess: () => {
      setGetDataSetReqParams({
        ...getDataSetReqParams,
        enableRequest: false,
      });
    },
    onError: (err: API.ErrorResp) => {
      message.error(
        `未找到数据源，错误信息：${
          err?.response?.data?.error || err?.message || '未知错误'
        }`
      );
      setGetDataSetReqParams({
        ...getDataSetReqParams,
        enableRequest: false,
      });
    },
  });

  const [user, setUser] = useRecoilState(userState);

  console.log('%c user >>>', 'background: yellow; color: blue', user);

  const { isLoading, isSuccess, isError, data, error } = useGetDataSet(
    {
      createUser: user.username,
    },
    {
      enabled: getDataSetReqParams?.enableRequest,
      retry: false,
      cacheTime: 10000,
      onSuccess: getDataSetReqParams?.onSuccess,
      onError: getDataSetReqParams?.onError,
    }
  );

  const [context, setContext] = useRecoilState(datasetSidebarState);

  const handleItemSelect = useCallback((item: any) => {}, []);

  return (
    <>
      <AnimatePresence>
        {context.isExpanded ? (
          <Container>
            {isLoading && (
              <section
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <Loading></Loading>
              </section>
            )}
            {isSuccess && (
              <TreeWithoutFilter
                data={data.data}
                onSelect={handleItemSelect}
              ></TreeWithoutFilter>
            )}
            {isError && (
              <ErrorIllustrator
                desc={`错误信息：${
                  error?.response?.data?.error || error?.message
                }`}
              />
            )}
          </Container>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default DatasetTree;
