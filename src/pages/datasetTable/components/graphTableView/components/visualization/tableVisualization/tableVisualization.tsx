import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { dataTableState } from '@stores/dataTable';
import { Table } from '@douyinfe/semi-ui';
import { ColumnProps } from 'antd/lib/table';
import { Data } from '@douyinfe/semi-ui/lib/es/table';
import { COLOR_PALETTE } from '@const/theme/color';
import Empty from '@components/illustration/empty';

const { useRef, useState, useEffect, useMemo } = React;

interface TableVisualizationProps {}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  padding: ${EDGE_DISTANCE}px;
  .header-row {
    background-color: ${COLOR_PALETTE.SORAME_WHITE}!important;
  }
`;

const TableVisualization: React.FC<TableVisualizationProps> = (
  props: TableVisualizationProps
) => {
  const {} = props;

  const [tableState, setDataTableState] = useRecoilState(dataTableState);

  const {
    searchInfo: { data },
    tableVisualizationSettings,
  } = tableState;

  const column =
    useMemo(() => {
      return data?.table?.[0]?.row?.map((rowItem, idx) => {
        if (tableVisualizationSettings?.resizable) {
          return {
            title: rowItem.key,
            dataIndex: rowItem.key,
            width: 200,
          };
        } else {
          return {
            title: rowItem.key,
            dataIndex: rowItem.key,
          };
        }
      });
    }, [
      data,
      tableVisualizationSettings,
      tableVisualizationSettings.resizable,
    ]) || [];

  const datasource = useMemo(() => {
    return data?.table?.map((row, idx) => {
      const rowData = row.row.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.key]: cur.value,
        };
      }, {});
      return {
        key: idx,
        ...rowData,
      };
    });
  }, [data]);

  return (
    <Container>
      <Table
        empty={<Empty></Empty>}
        columns={column}
        dataSource={datasource}
        onHeaderRow={(columns, index) => {
          return {
            className: 'header-row',
          };
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOpts: [10, 20, 50, 100],
        }}
        {...tableVisualizationSettings}
      ></Table>
    </Container>
  );
};

export default TableVisualization;
