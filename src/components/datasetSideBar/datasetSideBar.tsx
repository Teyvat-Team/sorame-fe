import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { message } from 'antd';
import { useGetDataSet } from '@/api';
import Loading from '@/components/illustration/loading';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import DatasetMenuHeader from './components/datasetMenuHeader';
import DatasetTree from './components/datasetTree';

const { useRef, useState, useEffect, useMemo } = React;

const Container = styled.section`
  overflow: hidden;
  height: calc(100vh - 220px);
  width: 208px;
`;

interface DatasetSideBarProps {}

const DatasetSideBar: React.FC<DatasetSideBarProps> = (
  props: DatasetSideBarProps
) => {
  const {} = props;

  return (
    <Container>
      <DatasetMenuHeader></DatasetMenuHeader>
      <DatasetTree></DatasetTree>
    </Container>
  );
};

export default DatasetSideBar;
