import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Typography } from 'antd';

const { useRef, useState, useEffect, useMemo } = React;

interface TableCustomStyleProps {}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  padding: ${EDGE_DISTANCE}px;
`;

const TableCustomStyle: React.FC<TableCustomStyleProps> = (
  props: TableCustomStyleProps
) => {
  const {} = props;

  return (
    <Container>
      <Typography.Title level={5}>图表样式</Typography.Title>
    </Container>
  );
};

export default TableCustomStyle;
