import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { COLOR_PALETTE } from '@/const/theme/color';
import { useRecoilState } from 'recoil';
import { dataTableState } from '@stores/dataTable';
import { BarDatum, Bar } from '@nivo/bar';
import { Pagination } from '@douyinfe/semi-ui';
import useStoreBackendPagination from '@/hooks/useStoreBackendPagination';

const { useRef, useState, useEffect, useMemo } = React;

interface BarChartVisualizationProps {}

interface TableVisualizationProps {}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  padding: ${EDGE_DISTANCE}px;
`;

const BarChartVisualization: React.FC<BarChartVisualizationProps> = (
  props: BarChartVisualizationProps
) => {
  const {} = props;

  const [tableState, setDataTableState] = useRecoilState(dataTableState);

  const {
    searchInfo: { data },
    fieldListDimensionList,
    fieldListMatrixList,
  } = tableState;

  const barData: BarDatum[] = useMemo(
    () =>
      data?.table?.map?.(r => {
        return r.row.reduce<BarDatum>((acc, cur) => {
          return {
            ...acc,
            [cur.key]: tableState?.fieldListDimensionList
              ?.map(i => i.name)
              ?.includes(cur.key)
              ? cur.value
              : Number(cur.value),
          };
        }, {});
      }) || ([] as BarDatum[]),
    [data]
  );

  const { barChartVisualizationSettings } = tableState;

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
      <Bar
        data={barData}
        // margin={{ top: 60, right: 110, bottom: 60, left: 80 }}
        keys={fieldListMatrixList?.map(i => `${i.function?.value}(${i?.name})`)}
        indexBy={
          barChartVisualizationSettings.indexBy
            ? barChartVisualizationSettings.indexBy
            : fieldListDimensionList?.[0].name
        }
        colors={{ scheme: 'nivo' }}
        labelTextColor={'inherit:darker(1.4)'}
        labelSkipWidth={16}
        labelSkipHeight={16}
        {...barChartVisualizationSettings}
      />
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

export default BarChartVisualization;
