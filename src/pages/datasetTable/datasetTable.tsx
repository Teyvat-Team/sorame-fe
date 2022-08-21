import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useResizable from '@/hooks/useResizable';
import Resizer from '@/components/resizer';
import GraphTableView from './components/graphTableView';
import { message, Modal } from 'antd';
import { useGetDataSetTable, useGetSearchInfo } from '@/api';
import { useNavigate, useParams } from 'react-router';
import DataBorard from './components/dataBoard';
import { IconMoreStroked } from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@/const/theme/color';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dataTableState, initialState } from '@stores/dataTable';
import useCallbackPrompt from '@/hooks/useCallbackPrompt';
import { useDebounce } from 'ahooks';
import { isObjectEqual } from '@/tools';

const { useRef, useState, useEffect, useMemo } = React;

interface DataSetTableProps {}

const LEFT_HIDDEN_SIZE = 145;

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

const DataBoardWrapperSection = styled.section``;

const DataBoardContent = styled.section`
  max-height: calc(100vh - 48px);
  height: calc(100vh - 48px);
  overflow-y: hidden;
  /* height: 100%;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    width: 4px;
    height: 4px;
  } */
`;

const GraphTableWrapperSection = styled.section``;

const INIT_LEFT_SIZE = 222;

const DataSetTable: React.FC<DataSetTableProps> = (
  props: DataSetTableProps
) => {
  const {} = props;

  const { datasetId = '', datasetTableId = '' } = useParams();

  const { size: resizableSize, handler: sizeHandler } = useResizable({
    size: INIT_LEFT_SIZE,
    maxSize: 300,
    direction: 'right',
  }) as {
    size: number;
    handler: (event: React.MouseEvent | React.TouchEvent) => void;
  };

  let enableRequest = true;

  const [tableState, setDataTableState] = useRecoilState(dataTableState);

  /** DataSetTable Info */
  const [getDataSetTableReqParams, setGetDataSetTableReqParams] =
    React.useState({
      enableRequest: enableRequest,
      onSuccess: (data: API.DataTableInfoResponse) => {
        enableRequest = false;
        setDataTableState(prev => {
          return {
            ...prev,
            tableInfo: data,
          };
        });
      },
      onError: (err: API.ErrorResp) => {
        message.error(
          `未找到表信息，错误信息：${
            err?.response?.data?.error || err?.message || '未知错误'
          }`
        );
        enableRequest = false;
      },
    });

  const { isLoading, isSuccess, isError, data, error } = useGetDataSetTable(
    {
      datasetId,
      dataTableId: datasetTableId,
    },
    {
      enabled: getDataSetTableReqParams?.enableRequest,
      retry: false,
      staleTime: 1000 * 60, //  1min
      onSuccess: getDataSetTableReqParams?.onSuccess,
      onError: getDataSetTableReqParams?.onError,
    }
  );

  /** SearchInfo */

  const { fieldListDimensionList, fieldListMatrixList } = tableState;

  const debouncedDimensionList = useDebounce(fieldListDimensionList, {
    wait: 200,
  });
  const debouncedMatrixList = useDebounce(fieldListMatrixList, { wait: 200 });

  const debouncedSortInfo = useDebounce(tableState.sortInfo, { wait: 200 });

  const debouncedWhereCauseInfo = useDebounce(tableState.whereCause, {
    wait: 200,
  });

  const debouncedPagination = useDebounce(tableState.dataPagination, {
    wait: 200,
  });

  let shouldRequestSearchInfo =
    isObjectEqual(debouncedDimensionList, fieldListDimensionList) &&
    isObjectEqual(debouncedMatrixList, fieldListMatrixList) &&
    isObjectEqual(debouncedSortInfo, tableState.sortInfo) &&
    isObjectEqual(debouncedPagination, tableState.dataPagination) &&
    debouncedWhereCauseInfo === tableState.whereCause &&
    fieldListDimensionList?.length >= 1 &&
    fieldListMatrixList?.length >= 1 &&
    fieldListMatrixList?.every(i => Boolean(i.function));

  const [getSearchInfoReqParams, setGetSearchInfoTableReqParams] =
    React.useState({
      onSuccess: (data: API.SearchInterfaceResponse) => {
        setDataTableState(prev => {
          return {
            ...prev,
            searchInfo: {
              ...prev.searchInfo,
              isLoading: false,
              isSuccess: true,
              isError: false,
              data,
            },
          };
        });
        shouldRequestSearchInfo = false;
      },
      onError: (err: API.ErrorResp) => {
        message.error(
          `查询出错，错误信息：${
            err?.response?.data?.error || err?.message || '未知错误'
          }`
        );
        shouldRequestSearchInfo = false;
      },
    });

  const selectList: API.SelectList[] = tableState?.fieldListMatrixList?.map?.(
    m => {
      return {
        function: m.function?.value || '',
        field: m.name || '',
      };
    }
  );

  const groupByList: string[] =
    tableState?.fieldListDimensionList?.map?.(m => m.name || '') || [];

  const {
    isLoading: isGetSearchInfoLoading,
    isSuccess: isGetSearchInfoSuccess,
    isError: isGetSearchInfoError,
    data: getSearchInfoData,
    error: getSearchInfoError,
  } = useGetSearchInfo(
    {
      datasetId: datasetId,
      tableId: datasetTableId,
      cache: true,
      selectList,
      whereCause: debouncedWhereCauseInfo,
      groupByList,
      sort: debouncedSortInfo,
      limit: tableState?.dataPagination?.pageSize || 10,
      offset:
        (tableState?.dataPagination?.current - 1) *
          (tableState?.dataPagination?.pageSize || 10) || 0,
    },
    {
      enabled: shouldRequestSearchInfo,
      // enabled: true,
      retry: false,
      staleTime: 1000 * 2, //  2s
      onSuccess: getSearchInfoReqParams?.onSuccess,
      onError: getSearchInfoReqParams?.onError,
    }
  );

  const {
    searchInfo: {
      isLoading: isStoreSearchLoading,
      isSuccess: isStoreSearchSuccess,
      isError: isStoreSearchError,
      data: storeSearchData,
      error: storeSearchError,
    },
  } = tableState;
  if (
    (isGetSearchInfoLoading && !isStoreSearchLoading) ||
    (isGetSearchInfoSuccess && isStoreSearchLoading) ||
    (isGetSearchInfoError && isStoreSearchLoading)
  ) {
    setDataTableState(prev => ({
      ...prev,
      searchInfo: {
        ...prev.searchInfo,
        isLoading: isGetSearchInfoLoading,
        isSuccess: isGetSearchInfoSuccess,
        isError: isGetSearchInfoError,
      },
    }));
  }

  const shouldBlock =
    tableState?.fieldListDimensionList?.length > 0 ||
    tableState?.fieldListMatrixList?.length > 0 ||
    tableState?.filterString?.length > 0;

  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(shouldBlock);

  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <Modal
          visible={showPrompt as boolean}
          title="确定离开吗？"
          onOk={() => {
            setDataTableState(prev => ({
              ...prev,
              ...initialState,
            }));
            if (typeof cancelNavigation !== 'boolean') {
              (confirmNavigation as () => void)?.();
            }
          }}
          onCancel={() => {
            if (typeof cancelNavigation !== 'boolean') {
              cancelNavigation?.();
            }
          }}
        >
          系统不会保存你现在所选取的维度、指标或分析状态。
        </Modal>
        <ResizeWrapper>
          {resizableSize > LEFT_HIDDEN_SIZE && (
            <DataBoardWrapperSection
              style={{
                width: resizableSize,
              }}
            >
              <DataBoardContent>
                <DataBorard
                  tableInfo={{
                    isLoading: isLoading,
                    isSuccess: isSuccess,
                    isError: isError,
                    data: data,
                  }}
                ></DataBorard>
              </DataBoardContent>
            </DataBoardWrapperSection>
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
          <GraphTableWrapperSection
            style={{
              width:
                resizableSize > LEFT_HIDDEN_SIZE
                  ? `calc(100% - ${resizableSize}px)`
                  : '100%',
            }}
          >
            <GraphTableView></GraphTableView>
          </GraphTableWrapperSection>
        </ResizeWrapper>
      </DndProvider>
    </Container>
  );
};

export default DataSetTable;
