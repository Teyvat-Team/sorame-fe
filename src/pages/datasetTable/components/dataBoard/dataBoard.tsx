import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Descriptions, Input, PageHeader, Typography } from 'antd';
import { IconArrowLeft, IconMoreStroked } from '@douyinfe/semi-icons';
import Loading from '@/components/illustration/loading';
import ContentSkeleton from '@/components/contentSkeleton';
import { loadingZIndex } from '@/const/theme/measurement';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import useResizable from '@/hooks/useResizable';
import HorizontalResizer from '@components/horizontalResizer';
import { COLOR_PALETTE } from '@/const/theme/color';

const { useRef, useState, useEffect, useMemo } = React;

interface DataBorardProps {
  tableInfo: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: API.DataTableInfoResponse | undefined;
  };
}

const UP_HIDDEN_SIZE = 108;

const EDGE_DISTANCE = 18;

const DataBoardContainer = styled.section``;

const HeaderSection = styled.section`
  padding: ${EDGE_DISTANCE}px;
  padding-top: 0;
`;

const DescriptionSection = styled.section`
  margin-bottom: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const DataBoardListSection = styled.section`
  height: calc(100vh - 192px);
  border-top: 2px solid ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
`;

const DimensionSection = styled.section`
  overflow-y: auto;
  padding: ${EDGE_DISTANCE}px;
  padding-right: 8px;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    width: 4px;
    height: 4px;
  }
`;

const MatrixSection = styled.section`
  padding: ${EDGE_DISTANCE}px;
  padding-right: 8px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    width: 4px;
    height: 4px;
  }
`;

const DataBoardItem = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: ${EDGE_DISTANCE}px;
  line-height: 1.5;
  height: 32px;
  margin-right: 8px;
  cursor: grab;
  text-overflow: ellipsis;
  overflow-x: hidden;
  :hover {
    background-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
  }
`;

const searchStyle: React.CSSProperties = {};

const DataBoard: React.FC<DataBorardProps> = (props: DataBorardProps) => {
  const {
    tableInfo: { isLoading, isSuccess, isError, data },
  } = props;

  const { size: dimensionSize, handler: resizeHandler } = useResizable({
    size: 450,
    direction: 'down',
  }) as {
    size: number;
    handler: (event: React.MouseEvent | React.TouchEvent) => void;
  };

  return (
    <DataBoardContainer>
      <PageHeader
        backIcon={
          <IconArrowLeft
            size="small"
            style={{
              position: 'relative',
              top: '-4px',
            }}
          />
        }
        onBack={() => window.history.back()}
        style={{ padding: EDGE_DISTANCE, paddingBottom: 0 }}
        title={<Typography.Title level={5}>数据表</Typography.Title>}
      />
      {isLoading && (
        <section
          css={css`
            position: relative;
          `}
        >
          <Loading
            style={{
              zIndex: loadingZIndex,
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              top: '30%',
              left: '50%',
            }}
          ></Loading>
          <ContentSkeleton
            style={{
              padding: EDGE_DISTANCE,
              overflow: 'hidden',
              maxWidth: '100%',
            }}
            noBlockSkeleton={true}
          ></ContentSkeleton>
          <ContentSkeleton
            style={{
              padding: EDGE_DISTANCE,
              overflow: 'hidden',
              maxWidth: '100%',
            }}
            noBlockSkeleton={true}
          ></ContentSkeleton>
          <ContentSkeleton
            style={{
              padding: EDGE_DISTANCE,
              overflow: 'hidden',
              maxWidth: '100%',
            }}
            noBlockSkeleton={true}
          ></ContentSkeleton>
        </section>
      )}
      {isError && (
        <ErrorIllustrator
          style={{
            padding: EDGE_DISTANCE,
          }}
          desc="未找到表信息，请稍后重试"
        ></ErrorIllustrator>
      )}
      {isSuccess && (
        <>
          <HeaderSection>
            <DescriptionSection>{data?.tableName || ''}</DescriptionSection>
            <Input
              size="middle"
              placeholder="输入关键词搜索"
              onChange={(e: React.BaseSyntheticEvent) => {}}
              allowClear
              style={searchStyle}
            />
          </HeaderSection>
          <DataBoardListSection>
            {dimensionSize > UP_HIDDEN_SIZE && (
              <DimensionSection
                style={{
                  height: dimensionSize,
                  maxHeight: dimensionSize,
                }}
              >
                <Typography.Title level={5}>维度</Typography.Title>
                {data?.dimensionList?.map((item: API.DimensionList) => {
                  return item?.name ? (
                    <DataBoardItem>{item.name}</DataBoardItem>
                  ) : null;
                })}
              </DimensionSection>
            )}
            <HorizontalResizer
              onMouseDown={resizeHandler}
              onTouchStart={resizeHandler}
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <IconMoreStroked
                style={{
                  color: COLOR_PALETTE.SORAME_HEADER_SEARCH_BG_HOVER,
                  position: 'absolute',
                  top: '-3px',
                }}
              />
            </HorizontalResizer>
            <MatrixSection
              style={{
                height:
                  dimensionSize < UP_HIDDEN_SIZE
                    ? '100%'
                    : `calc(100% - ${dimensionSize}px)`,
              }}
            >
              <Typography.Title level={5}>指标</Typography.Title>
              {data?.metricList?.map((item: API.DimensionList) => {
                return item?.name ? (
                  <DataBoardItem>{item.name}</DataBoardItem>
                ) : null;
              })}
            </MatrixSection>
          </DataBoardListSection>
        </>
      )}
      <section></section>
    </DataBoardContainer>
  );
};

export default DataBoard;
