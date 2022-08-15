import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;

interface AnalyzerTabProps {}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  padding: ${EDGE_DISTANCE}px;
`;

const AnalyzerTab: React.FC<AnalyzerTabProps> = (props: AnalyzerTabProps) => {
  const {} = props;

  return <Container>分析区域</Container>;
};

export default AnalyzerTab;
