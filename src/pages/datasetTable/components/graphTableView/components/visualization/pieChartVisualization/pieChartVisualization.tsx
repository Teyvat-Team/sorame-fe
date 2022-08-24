import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;
import { Pie } from '@nivo/pie';
import { useRecoilState } from 'recoil';
import { dataTableState } from '@stores/dataTable';
import Empty from '@components/illustration/empty';
import { Pagination } from '@douyinfe/semi-ui';
import useStoreBackendPagination from '@/hooks/useStoreBackendPagination';
import { cloneDeep } from 'lodash';

interface PieChartVisualizationProps {}

const EDGE_DISTANCE = 14;

const deDupAndMerge = (
  pieData: Array<{
    // must be unique for the whole dataset
    id: string | number;
    value: number;
  }>
) => {
  let clonedPieData = cloneDeep(pieData);
  for (let i = 0; i < clonedPieData.length; i++) {
    let j = i + 1;
    while (j < clonedPieData.length) {
      if (clonedPieData[i].id === clonedPieData[j].id) {
        clonedPieData[i].value += clonedPieData[j].value;
        clonedPieData = [
          ...clonedPieData.slice(0, j),
          ...clonedPieData.slice(j + 1),
        ];
      } else {
        j += 1;
      }
    }
  }
  return clonedPieData;
};

const PieChartVisualization: React.FC<PieChartVisualizationProps> = (
  props: PieChartVisualizationProps
) => {
  const {} = props;

  const [tableState, setDataTableState] = useRecoilState(dataTableState);
  const {
    searchInfo: { data },
    fieldListDimensionList,
    fieldListMatrixList,
    pieChartVisualizationSettings,
  } = tableState;

  const pieIndexBy =
    pieChartVisualizationSettings.indexBy ||
    fieldListDimensionList?.[0]?.name ||
    '';

  const pieData: Array<{
    // must be unique for the whole dataset
    id: string | number;
    value: number;
  }> = data?.table?.map?.(r => {
    return {
      id: r.row.find(i => i.key === pieIndexBy)?.value,
      value:
        Number(
          r.row.find(i => i.key?.includes(fieldListMatrixList?.[0]?.name))
            ?.value
        ) ?? 0,
    };
  });

  // dedup and merge
  const deDupedPieData = deDupAndMerge(pieData);

  let commonProperties = {
    width: 900,
    height: 500,
    data: deDupedPieData,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    animate: true,
    activeOuterRadiusOffset: 8,
  };

  if (pieChartVisualizationSettings?.hasLegends) {
    commonProperties.legends = [
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 30,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
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
    <>
      {fieldListMatrixList?.length !== 1 && (
        <Empty title="饼图仅支持多个维度和一个指标"></Empty>
      )}
      {fieldListMatrixList?.length === 1 && (
        <section>
          <Pie {...commonProperties} {...pieChartVisualizationSettings}></Pie>
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
        </section>
      )}
    </>
  );
};

export default PieChartVisualization;
