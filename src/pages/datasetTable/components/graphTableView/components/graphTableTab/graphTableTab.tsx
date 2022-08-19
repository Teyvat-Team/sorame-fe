import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AreaChartOutlined, TableOutlined } from '@ant-design/icons';
import { COLOR_PALETTE } from '@/const/theme/color';
import { Button } from '@douyinfe/semi-ui';
import { Tooltip } from 'antd';
import {
  IconBarChartVStroked,
  IconLineChartStroked,
  IconPieChart2Stroked,
} from '@douyinfe/semi-icons';
import { useRecoilState } from 'recoil';
import { dataTableState } from '@stores/dataTable';
import { visualizationCustomStyleComponentMap } from './components/customStyle';

const { useRef, useState, useEffect, useMemo } = React;

interface GraphTableTabProps {}

const EDGE_DISTANCE = 14;

const VisualizationIconSection = styled.section`
  padding: ${EDGE_DISTANCE}px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 32px);
  grid-gap: 14px;
  border-bottom: 2px solid ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
`;

const CustomStyleSection = styled.section`
  padding: ${EDGE_DISTANCE}px;
`;

const GraphTableTab: React.FC<GraphTableTabProps> = (
  props: GraphTableTabProps
) => {
  const {} = props;

  const [{ selectedGraphType }, setDataTableState] =
    useRecoilState(dataTableState);

  return (
    <>
      <VisualizationIconSection>
        <Tooltip title="表格" placement="bottom">
          <Button
            style={{
              background:
                selectedGraphType === 'table'
                  ? COLOR_PALETTE.SORAME_BLUE
                  : COLOR_PALETTE.SORAME_INPUT_BACKGROUND,
              color:
                selectedGraphType === 'table'
                  ? COLOR_PALETTE.SORAME_WHITE
                  : COLOR_PALETTE.SORAME_BLUE,
            }}
            icon={<TableOutlined />}
            onClick={() => {
              setDataTableState(prev => {
                return {
                  ...prev,
                  selectedGraphType: 'table',
                };
              });
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="柱状图" placement="bottom">
          <Button
            style={{
              background:
                selectedGraphType === 'barChart'
                  ? COLOR_PALETTE.SORAME_BLUE
                  : COLOR_PALETTE.SORAME_INPUT_BACKGROUND,
              color:
                selectedGraphType === 'barChart'
                  ? COLOR_PALETTE.SORAME_WHITE
                  : COLOR_PALETTE.SORAME_BLUE,
            }}
            icon={<IconBarChartVStroked />}
            onClick={() => {
              setDataTableState(prev => {
                return {
                  ...prev,
                  selectedGraphType: 'barChart',
                };
              });
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="折线图" placement="bottom">
          <Button
            icon={<IconLineChartStroked />}
            style={{
              background:
                selectedGraphType === 'lineChart'
                  ? COLOR_PALETTE.SORAME_BLUE
                  : COLOR_PALETTE.SORAME_INPUT_BACKGROUND,
              color:
                selectedGraphType === 'lineChart'
                  ? COLOR_PALETTE.SORAME_WHITE
                  : COLOR_PALETTE.SORAME_BLUE,
            }}
            onClick={() => {
              setDataTableState(prev => {
                return {
                  ...prev,
                  selectedGraphType: 'lineChart',
                };
              });
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="面积图" placement="bottom">
          <Button
            style={{
              background:
                selectedGraphType === 'areaChart'
                  ? COLOR_PALETTE.SORAME_BLUE
                  : COLOR_PALETTE.SORAME_INPUT_BACKGROUND,
              color:
                selectedGraphType === 'areaChart'
                  ? COLOR_PALETTE.SORAME_WHITE
                  : COLOR_PALETTE.SORAME_BLUE,
            }}
            icon={
              <AreaChartOutlined
                style={{
                  fontSize: '17px',
                }}
              />
            }
            onClick={() => {
              setDataTableState(prev => {
                return {
                  ...prev,
                  selectedGraphType: 'areaChart',
                };
              });
            }}
          ></Button>
        </Tooltip>
        <Tooltip title="饼图" placement="bottom">
          <Button
            style={{
              background:
                selectedGraphType === 'pieChart'
                  ? COLOR_PALETTE.SORAME_BLUE
                  : COLOR_PALETTE.SORAME_INPUT_BACKGROUND,
              color:
                selectedGraphType === 'pieChart'
                  ? COLOR_PALETTE.SORAME_WHITE
                  : COLOR_PALETTE.SORAME_BLUE,
            }}
            icon={<IconPieChart2Stroked />}
            onClick={() => {
              setDataTableState(prev => {
                return {
                  ...prev,
                  selectedGraphType: 'pieChart',
                };
              });
            }}
          ></Button>
        </Tooltip>
      </VisualizationIconSection>
      <CustomStyleSection>
        {visualizationCustomStyleComponentMap[selectedGraphType]}
      </CustomStyleSection>
    </>
  );
};

export default GraphTableTab;
