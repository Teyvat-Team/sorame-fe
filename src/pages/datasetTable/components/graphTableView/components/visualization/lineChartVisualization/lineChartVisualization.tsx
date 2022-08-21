import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;
import { Line } from '@nivo/line';
import { useRecoilState } from 'recoil';
import { dataTableState } from '@stores/dataTable';
import { Pagination } from '@douyinfe/semi-ui';
import useStoreBackendPagination from '@/hooks/useStoreBackendPagination';

interface LineChartVisualizationProps {}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  padding: ${EDGE_DISTANCE}px;
`;

const LineChartVisualization: React.FC<LineChartVisualizationProps> = (
  props: LineChartVisualizationProps
) => {
  const [tableState, setDataTableState] = useRecoilState(dataTableState);
  const {
    searchInfo: { data },
    fieldListDimensionList,
    fieldListMatrixList,
    lineChartVisualizationSettings,
  } = tableState;
  const {} = props;

  const lineIndexBy =
    lineChartVisualizationSettings.indexBy ||
    fieldListDimensionList?.[0]?.name ||
    '';

  const lineData: Array<{
    id: string | number;
    data: Array<{
      x: number | string | Date;
      y: number | string | Date;
    }>;
  }> = useMemo(() => {
    return data?.table?.map(r => {
      return {
        id: r.row.find(i => i.key === lineIndexBy)?.value,
        data: r.row
          .map((c, idx) => {
            if (fieldListDimensionList?.map(f => f.name)?.includes(c.key)) {
              return null;
            }
            return {
              x: c.key,
              y: Number(c.value),
            };
          })
          .filter(Boolean),
      };
    });
  }, [data, fieldListDimensionList, lineIndexBy]);

  const lineProps = {
    data: lineData,
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    animate: true,
  };

  if (lineChartVisualizationSettings.hasLegends) {
    lineProps.legends = [
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 0,
        translateY: 0,
        itemWidth: 100,
        itemHeight: 20,
        itemsSpacing: 4,
        symbolSize: 20,
        symbolShape: 'circle',
        itemDirection: 'left-to-right',
        itemTextColor: '#777',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ];
  }

  const { onPageChange, onPageSizeChange, pageSizeOptions, pageSize, current } =
    useStoreBackendPagination();

  const paginationProps = {
    showSizeChanger: true,
    onPageChange,
    onPageSizeChange,
    pageSize,
    currentPage: current,
    total: data?.total,
    pageSizeOpts: pageSizeOptions,
  };

  return (
    <Container>
      <Line
        yScale={{
          type: 'linear',
          stacked: true,
        }}
        enableSlices="x"
        {...lineProps}
        {...lineChartVisualizationSettings}
      ></Line>
      <div
        style={{
          float: 'right',
          marginRight: EDGE_DISTANCE,
        }}
      >
        <Pagination
          {...paginationProps}
          showSizeChanger
          showQuickJumper
          style={{ marginTop: 14, marginBottom: 14 }}
        ></Pagination>
      </div>
    </Container>
  );
};

export default LineChartVisualization;
