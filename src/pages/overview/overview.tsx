import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@stores/user';
import { overviewState } from '@stores/overview';
import { Button, message } from 'antd';
import { useGetDataSet } from '@/api';
import { useDebounce } from 'ahooks';

const { useRef, useState, useEffect, useMemo } = React;

import { Typography } from 'antd';
import DatasetFilter from './components/datasetFilter';
import DatasetCards from './components/datasetCards';
import Loading from '@components/illustration/loading';
import { deleteNilVal, isObjectEqual } from '@/tools';
import { loadingZIndex } from '@const/theme/measurement';
import Empty from '@components/illustration/empty';
import NewDatasetModal from '@components/newDatasetModal';
import { COLOR_PALETTE } from '@const/theme/color';
import { IconPlus } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router';
import ErrorIllustrator from '@components/illustration/errorIllustrator';

const { Title } = Typography;

const Container = styled.section`
  padding: 48px;
  max-height: 100%;
  height: 100%;
  overflow-y: auto;
`;

interface OverviewProps {}

const Overview: React.FC<OverviewProps> = (props: OverviewProps) => {
  const {} = props;

  const user = useRecoilValue(userState);

  const [{ datasetFilterVal, needRefresh }, setOverViewState] =
    useRecoilState(overviewState);

  const debouncedFilterVal = useDebounce(datasetFilterVal, {
    wait: 700,
  });

  const isDebounceEqual = isObjectEqual(datasetFilterVal, debouncedFilterVal);

  let enableRequest = isDebounceEqual || needRefresh;

  const storeState = useRecoilValue(userState);

  const { username = 'admin' } = storeState;

  const navigate = useNavigate();

  const [getDataSetReqParams, setGetDataSetReqParams] = useState({
    enableRequest,
    onSuccess: () => {
      if (enableRequest) {
        enableRequest = false;
      }
      if (needRefresh) {
        setOverViewState(state => ({
          ...state,
          needRefresh: false,
        }));
      }
    },
    onError: (err: API.ErrorResp) => {
      message.error(
        `未找到数据集，错误信息：${
          err?.response?.data?.error || err?.message || '未知错误'
        }`
      );
      if (enableRequest) {
        enableRequest = false;
      }
      if (needRefresh) {
        setOverViewState(state => ({
          ...state,
          needRefresh: false,
        }));
      }
    },
  });

  const queryOptions = useMemo(
    () => ({
      enabled: getDataSetReqParams?.enableRequest || enableRequest,
      retry: false,
      staleTime: 1000 * 2, // 2s
      onSuccess: getDataSetReqParams?.onSuccess,
      onError: getDataSetReqParams?.onError,
    }),
    [getDataSetReqParams, enableRequest]
  );

  const deNilParams = deleteNilVal(debouncedFilterVal);

  const params = deNilParams.keyword
    ? deleteNilVal({
        ...deNilParams,
        keyword: deNilParams.keyword?.trim(),
        createUser: username || 'admin',
      })
    : {
        ...deNilParams,
        createUser: username || 'admin',
      };

  const { isLoading, isSuccess, isError, data, error, refetch } = useGetDataSet(
    params as API.DataSetListRequest,
    queryOptions
  );

  if (needRefresh) {
    setOverViewState(state => {
      return {
        ...state,
        needRefresh: false,
      };
    });
  }

  return (
    <Container>
      <Title level={2}>全部数据集</Title>
      <DatasetFilter></DatasetFilter>
      {isLoading && (
        <Loading
          style={{
            zIndex: loadingZIndex,
            display: 'flex',
            position: 'absolute',
            top: '30%',
            left: '50%',
            justifyContent: 'center',
          }}
        ></Loading>
      )}
      {isError && (
        <ErrorIllustrator
          style={{
            padding: 28,
          }}
          desc="数据集加载失败"
        ></ErrorIllustrator>
      )}
      {!isError && (
        <DatasetCards
          data={data?.data || []}
          isLoading={isLoading}
        ></DatasetCards>
      )}
    </Container>
  );
};

export default Overview;
