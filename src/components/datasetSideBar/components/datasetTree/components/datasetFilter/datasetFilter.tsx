import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  Button,
  Dropdown,
  Input,
  List,
  Menu,
  Popover,
  SelectProps,
  Typography,
} from 'antd';
import { IconSearch } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import { useSetRecoilState } from 'recoil';
import {
  DatasetSidebarState,
  datasetSidebarState,
} from '@stores/datasetSidebar';

const { Search } = Input;

const SEARCH_WIDTH = 188;

const { useRef, useState, useEffect, useMemo } = React;

const searchStyle: React.CSSProperties = {
  margin: '0 12px',
  width: SEARCH_WIDTH,
  maxWidth: `${SEARCH_WIDTH}`,
};

interface DatasetFilterProps {}

const DatasetFilter: React.FC<DatasetFilterProps> = (
  props: DatasetFilterProps
) => {
  const {} = props;

  const setStoreFilterVal = useSetRecoilState(datasetSidebarState);

  const setFilterValue = (value: string) => {
    setStoreFilterVal((state: DatasetSidebarState) => {
      return {
        ...state,
        filterVal: value,
      };
    });
  };

  return (
    <>
      <Input
        size="middle"
        placeholder="筛选"
        onChange={(e: React.BaseSyntheticEvent) => {
          setFilterValue(e.target.value);
        }}
        allowClear
        style={searchStyle}
      />
    </>
  );
};

export default DatasetFilter;
