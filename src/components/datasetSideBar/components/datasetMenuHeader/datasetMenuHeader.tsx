import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  IconArchive,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
} from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@/const/theme/color';
import { useRecoilState } from 'recoil';
import { datasetSidebarState } from '@/stores/datasetSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import Chevron from './components/chevron';

const { useRef, useState, useEffect, useMemo, useCallback } = React;

interface DatasetMenuHeaderProps {}

const Header = styled.li`
  padding: 0 16px;
  padding-left: 22px;
  display: flex;
  align-items: center;
  transition: all 0.5s, padding 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
  width: calc(100% + 1px);
  height: 40px;
  line-height: 40px;
  margin-top: 4px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  text-align: -webkit-match-parent;
  box-sizing: border-box;
  font-variant: tabular-nums;
  font-feature-settings: 'tnum';
  color: rgba(0, 0, 0, 0.85);
  list-style: none;
  font-size: 14px;
  cursor: pointer;
  :hover {
    color: ${COLOR_PALETTE.SORAME_LIGHT_BLUE};
  }
`;

const ExpendArrowSection = styled.section`
  position: absolute;
  right: 12px;
`;

const DatasetMenuHeader: React.FC<DatasetMenuHeaderProps> = (
  props: DatasetMenuHeaderProps
) => {
  const {} = props;

  const [context, setDatasetSidebarState] = useRecoilState(datasetSidebarState);

  const toggle = () => {
    setDatasetSidebarState(cur => ({
      ...cur,
      isExpanded: !cur.isExpanded,
    }));
  };

  const handleClick = useCallback(() => {
    toggle();
  }, []);

  return (
    <>
      <Header onClick={handleClick}>
        <IconArchive
          style={{
            marginRight: 8,
          }}
        />
        数据集
        <ExpendArrowSection>
          <AnimatePresence>
            <Chevron type={context.isExpanded ? 'up' : 'down'}></Chevron>
          </AnimatePresence>
        </ExpendArrowSection>
      </Header>
    </>
  );
};

export default DatasetMenuHeader;
