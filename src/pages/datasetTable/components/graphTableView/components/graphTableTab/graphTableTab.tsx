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
import { customStyleMap } from './customStyleMap';
import TableCustomStyle from './components/tableCustomStyle';

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

  return (
    <>
      <VisualizationIconSection>
        <Tooltip title="表格" placement="bottom">
          <Button icon={<TableOutlined />}></Button>
        </Tooltip>
        <Tooltip title="柱状图" placement="bottom">
          <Button icon={<IconBarChartVStroked />}></Button>
        </Tooltip>
        <Tooltip title="折线图" placement="bottom">
          <Button icon={<IconLineChartStroked />}></Button>
        </Tooltip>
        <Tooltip title="面积图" placement="bottom">
          <Button
            icon={
              <AreaChartOutlined
                style={{
                  fontSize: '17px',
                }}
              />
            }
          ></Button>
        </Tooltip>
        <Tooltip title="饼图" placement="bottom">
          <Button icon={<IconPieChart2Stroked />}></Button>
        </Tooltip>
      </VisualizationIconSection>
      <CustomStyleSection>{customStyleMap['table']}</CustomStyleSection>
    </>
  );
};

export default GraphTableTab;
