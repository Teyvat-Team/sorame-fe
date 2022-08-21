import { dataTableState } from '@stores/dataTable';
import * as React from 'react';
import { useRecoilState } from 'recoil';
const { useRef, useState, useEffect, useMemo } = React;

const useStoreBackendPagination = () => {
  const [tableState, setDataTableState] = useRecoilState(dataTableState);

  const {
    dataPagination: { pageSize, pageSizeOptions, current, total },
  } = tableState;

  const onPageChange = (page: number) => {
    setDataTableState(state => ({
      ...state,
      dataPagination: {
        ...state.dataPagination,
        current: page,
      },
    }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setDataTableState(state => ({
      ...state,
      dataPagination: {
        ...state.dataPagination,
        pageSize,
      },
    }));
  };

  const setTotal = (total: number) => {
    setDataTableState(state => ({
      ...state,
      dataPagination: {
        ...state.dataPagination,
        total,
      },
    }));
  };

  const resetPage = () => {
    setDataTableState(state => ({
      ...state,
      dataPagination: {
        ...state.dataPagination,
        current: 1,
      },
    }));
  };

  return {
    pageSize,
    pageSizeOptions,
    current,
    total,
    setTotal,
    resetPage,
    onPageChange,
    onPageSizeChange,
  };
};

export default useStoreBackendPagination;
