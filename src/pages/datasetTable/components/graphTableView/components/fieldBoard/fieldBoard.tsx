import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { COLOR_PALETTE } from '@/const/theme/color';
import { Typography } from 'antd';
import { useDrop } from 'react-dnd';
import { DRAG_TYPE } from '@const/drag';
import MetricTag from './components/metricTag';
import { useRecoilState } from 'recoil';
import { dataTableState } from '@stores/dataTable';
import { Tag } from '@douyinfe/semi-ui';

const { useRef, useState, useEffect, useMemo } = React;

interface FieldBoardProps {}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  border-bottom: 2px solid ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
`;

const LineSection = styled.section`
  padding: ${EDGE_DISTANCE}px;
  display: flex;
  /* align-items: center; */
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const FieldBoard: React.FC<FieldBoardProps> = (props: FieldBoardProps) => {
  const {} = props;

  const [
    { isOver: isDimensionOver, canDrop: canDimensionDrop },
    dimensionDrop,
  ] = useDrop(
    () => ({
      accept: DRAG_TYPE.DIMENSION,
      drop: () => ({ type: DRAG_TYPE.DIMENSION }),
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );

  const [{ isOver: isMetricOver, canDrop: canMetricDrop }, metricDrop] =
    useDrop(
      () => ({
        accept: DRAG_TYPE.METRIC,
        drop: () => ({ type: DRAG_TYPE.METRIC }),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }),
      }),
      []
    );

  const [
    { fieldListDimensionList = [], fieldListMatrixList = [], tableInfo },
    setDataTableState,
  ] = useRecoilState(dataTableState);

  return (
    <Container>
      <LineSection
        ref={dimensionDrop}
        css={css`
          border-bottom: 2px solid ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
          background-color: ${canDimensionDrop
            ? isDimensionOver
              ? COLOR_PALETTE.SORAME_INPUT_HOVER_BG
              : COLOR_PALETTE.SORAME_INPUT_BACKGROUND
            : 'transparent'};
        `}
      >
        <Typography.Title
          level={5}
          style={{
            position: 'relative',
            top: '10px',
          }}
        >
          维度
        </Typography.Title>
        {fieldListDimensionList?.map?.(item => {
          return (
            <Tag
              color="blue"
              key={item?.name}
              closable={true}
              onClose={() => {
                setDataTableState(state => {
                  return {
                    ...state,
                    fieldListDimensionList:
                      state.fieldListDimensionList?.filter?.(f => {
                        return f?.name !== item?.name;
                      }),
                  };
                });
              }}
              style={{
                borderRadius: '14px',
                fontSize: '14px',
                padding: '14px 14px',
                margin: '8px 8px',
              }}
            >
              {item?.name || ''}
            </Tag>
          );
        })}
      </LineSection>
      <LineSection
        ref={metricDrop}
        css={css`
          border-bottom: 2px solid ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
          background-color: ${canMetricDrop
            ? isMetricOver
              ? COLOR_PALETTE.SORAME_INPUT_HOVER_BG
              : COLOR_PALETTE.SORAME_INPUT_BACKGROUND
            : 'transparent'};
        `}
      >
        <Typography.Title
          level={5}
          style={{
            position: 'relative',
            top: '10px',
          }}
        >
          指标
        </Typography.Title>
        {fieldListMatrixList?.map?.(item => {
          return (
            <MetricTag
              key={item?.name}
              item={item}
              functionList={tableInfo?.functionList || []}
            ></MetricTag>
          );
        })}
      </LineSection>
    </Container>
  );
};

export default FieldBoard;
