import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;

interface DatasetFilterProps {}

const Container = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const DatasetFilter: React.FC<DatasetFilterProps> = (
  props: DatasetFilterProps
) => {
  const {} = props;

  return <Container>筛选</Container>;
};

export default DatasetFilter;
