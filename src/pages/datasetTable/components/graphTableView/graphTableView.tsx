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

const { useRef, useState, useEffect, useMemo } = React;

const { TabPane } = Tabs;

interface GraphTableViewProps {}

const LEFT_HIDDEN_SIZE = 107;

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

const ViewSection = styled.section``;

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

  const { selectedGraphType } = tableState;

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
                  <AnalyzerTab></AnalyzerTab>
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
          {visualizationComponentMap[selectedGraphType]}
        </ViewSection>
      </ResizeWrapper>
    </Container>
  );
};

export default GraphTableView;
