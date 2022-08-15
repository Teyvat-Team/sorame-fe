import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { COLOR_PALETTE } from '@/const/theme/color';
import { Typography } from 'antd';

const { useRef, useState, useEffect, useMemo } = React;

interface FieldBoardProps {}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  border-bottom: 2px solid ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
`;

const LineSection = styled.section`
  padding: ${EDGE_DISTANCE}px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const FieldBoard: React.FC<FieldBoardProps> = (props: FieldBoardProps) => {
  const {} = props;

  return (
    <Container>
      <LineSection
        css={css`
          border-bottom: 2px solid ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
        `}
      >
        <Typography.Title level={5}>维度</Typography.Title>
      </LineSection>
      <LineSection>
        <Typography.Title level={5}>指标</Typography.Title>
      </LineSection>
    </Container>
  );
};

export default FieldBoard;
