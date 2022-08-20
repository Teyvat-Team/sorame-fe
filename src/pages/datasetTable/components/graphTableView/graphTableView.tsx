import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useResizable from '@/hooks/useResizable';
import Resizer from '@/components/resizer';
import { IconMoreStroked } from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@/const/theme/color';
import { Tabs } from 'antd';
import GraphTableTab from './components/graphTableTab';
import AnalyzerTab from './components/analyzerTab';
import FieldBoard from './components/fieldBoard';
import { visualizationComponentMap } from './components/visualization';
import { useRecoilState } from 'recoil';
import { dataTableState } from '@stores/dataTable';
import Loading from '@/components/illustration/loading';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import { loadingZIndex } from '@/const/theme/measurement';
import ContentSkeleton from '@/components/contentSkeleton';
import Empty from '@/components/illustration/empty';

const { useRef, useState, useEffect, useMemo } = React;

const { TabPane } = Tabs;

interface GraphTableViewProps {}

const LEFT_HIDDEN_SIZE = 107;

const EDGE_DISTANCE = 14;

const Container = styled.section`
  max-height: calc(100vh - 48px);
  height: calc(100vh - 48px);
  overflow-y: hidden;
`;

const ResizeWrapper = styled.section`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  height: calc(100vh - 48px);
  overflow-y: hidden;
`;

const AnalyzerWrapperSection = styled.section``;

const AnalyzerContent = styled.section`
  height: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    width: 4px;
    height: 4px;
  }
`;

const ViewSection = styled.section`
  width: calc(100% - 290px);
  height: calc(100vh - 48px);
  max-height: calc(100vh - 48px);
  overflow: auto;
`;

const VisualizationWrapper = styled.section``;

const INIT_LEFT_SIZE = 290;

const GraphTableView: React.FC<GraphTableViewProps> = (
  props: GraphTableViewProps
) => {
  const {} = props;

  const { size: resizableSize, handler: sizeHandler } = useResizable({
    size: INIT_LEFT_SIZE,
    maxSize: 290,
    direction: 'right',
  }) as {
    size: number;
    handler: (event: React.MouseEvent | React.TouchEvent) => void;
  };

  const [tableState, setDataTableState] = useRecoilState(dataTableState);

  const {
    selectedGraphType,
    searchInfo: { isError, isLoading, isSuccess, error, data },
  } = tableState;

  const isEmpty =
    isError === false && isLoading === false && isSuccess === false;

  return (
    <Container>
      <ResizeWrapper>
        {resizableSize > LEFT_HIDDEN_SIZE && (
          <AnalyzerWrapperSection
            style={{
              width: resizableSize,
            }}
          >
            <AnalyzerContent>
              <Tabs defaultActiveKey="graphTable" centered>
                <TabPane tab="图表" key="graphTable">
                  <GraphTableTab></GraphTableTab>
                </TabPane>
                <TabPane tab="分析" key="analyzer">
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
                          padding: EDGE_DISTANCE,
                        }}
                      ></Loading>
                      <ContentSkeleton
                        style={{
                          padding: 14,
                          overflow: 'hidden',
                          maxWidth: '100%',
                          maxHeight: 140,
                        }}
                      ></ContentSkeleton>
                    </section>
                  )}
                  {isEmpty && (
                    <Empty
                      style={{
                        padding: EDGE_DISTANCE,
                      }}
                      title="未开始查询"
                      desc="查询后可进行分析"
                    ></Empty>
                  )}
                  {isError && (
                    <ErrorIllustrator
                      style={{
                        padding: EDGE_DISTANCE,
                      }}
                    ></ErrorIllustrator>
                  )}
                  {isSuccess && <AnalyzerTab></AnalyzerTab>}
                </TabPane>
              </Tabs>
            </AnalyzerContent>
          </AnalyzerWrapperSection>
        )}
        <Resizer
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}
          onMouseDown={sizeHandler}
          onTouchStart={sizeHandler}
        >
          <IconMoreStroked
            style={{
              color: COLOR_PALETTE.SORAME_HEADER_SEARCH_BG_HOVER,
              transform: 'rotate(90deg)',
            }}
          />
        </Resizer>
        <ViewSection
          style={{
            width:
              resizableSize > LEFT_HIDDEN_SIZE
                ? `calc(100% - ${resizableSize}px)`
                : '100%',
          }}
        >
          <FieldBoard></FieldBoard>
          <VisualizationWrapper>
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
                    top: '10%',
                    left: '50%',
                  }}
                ></Loading>
                <ContentSkeleton
                  style={{
                    padding: EDGE_DISTANCE,
                    overflow: 'hidden',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                ></ContentSkeleton>
              </section>
            )}
            {isError && (
              <ErrorIllustrator
                desc={`错误信息：${
                  error?.response?.data?.error || error?.message
                }`}
              />
            )}
            {isSuccess && visualizationComponentMap[selectedGraphType]}
            {isEmpty && (
              <Empty
                style={{
                  padding: EDGE_DISTANCE,
                }}
                title="未开始查询"
                desc="拖曳至少1个维度和1个指标到相应区域并选择聚合算子（如求和等）即可自动查询"
              ></Empty>
            )}
          </VisualizationWrapper>
        </ViewSection>
      </ResizeWrapper>
    </Container>
  );
};

export default GraphTableView;
