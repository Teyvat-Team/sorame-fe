import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { userState } from '@stores/user';
import { overviewState } from '@stores/overview';
import { message } from 'antd';
import { useGetDataSet } from '@/api';
import { useDebounce } from 'ahooks';

const { useRef, useState, useEffect, useMemo } = React;

import { Typography } from 'antd';
import DatasetFilter from './components/datasetFilter';
import DatasetCards from './components/datasetCards';
import Loading from '@components/illustration/loading';
import { deleteNilVal, isObjectEqual } from '@/tools';
import { loadingZIndex } from '@const/theme/measurement';

const { Title } = Typography;

const Container = styled.section`
  padding: 48px;
`;

interface OverviewProps {}

const Overview: React.FC<OverviewProps> = (props: OverviewProps) => {
  const {} = props;

  const user = useRecoilValue(userState);

  const { datasetFilterVal } = useRecoilValue(overviewState);

  const { keyword = '' } = datasetFilterVal;

  const debouncedFilterVal = useDebounce(datasetFilterVal, {
    wait: 700,
  });

  const isDebounceEqual = isObjectEqual(datasetFilterVal, debouncedFilterVal);

  let enableRequest = isDebounceEqual;

  const [getDataSetReqParams, setGetDataSetReqParams] = useState({
    enableRequest: enableRequest,
    onSuccess: () => {
      if (enableRequest) {
        enableRequest = false;
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
    },
  });

  const { isLoading, isSuccess, isError, data, error } = useGetDataSet(
    deleteNilVal(debouncedFilterVal) as API.DataSetListRequest,
    {
      enabled: getDataSetReqParams?.enableRequest,
      retry: false,
      cacheTime: 10000,
      onSuccess: getDataSetReqParams?.onSuccess,
      onError: getDataSetReqParams?.onError,
    }
  );

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
      <DatasetCards
        data={data?.data || []}
        isLoading={isLoading}
      ></DatasetCards>
    </Container>
  );
};

export default Overview;
