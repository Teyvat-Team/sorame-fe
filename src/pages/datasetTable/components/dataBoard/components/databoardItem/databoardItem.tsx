import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { COLOR_PALETTE } from '@/const/theme/color';
import { DRAG_TYPE } from '@const/drag';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { useSetRecoilState } from 'recoil';
import { dataTableState } from '@/stores/dataTable';

const { useRef, useState, useEffect, useMemo } = React;

const EDGE_DISTANCE = 14;

interface DataboardItemProps {
  type: 'DIMENSION' | 'METRIC';
  item: API.DimensionList | API.MetricList;
}

const DataBoardItemContainer = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: ${EDGE_DISTANCE}px;
  line-height: 1.5;
  height: 32px;
  margin-right: 8px;
  cursor: grab;
  text-overflow: ellipsis;
  overflow-x: hidden;
  :hover {
    background-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
  }
`;

interface DropResult {
  type: 'DIMENSION' | 'METRIC';
}

const DataboardItem: React.FC<DataboardItemProps> = (
  props: DataboardItemProps
) => {
  const { item, type } = props;

  const setDataTableState = useSetRecoilState(dataTableState);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: type === 'DIMENSION' ? DRAG_TYPE.DIMENSION : DRAG_TYPE.METRIC,
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
      item,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (item && dropResult) {
          // alert(`You dropped ${item.name} into ${dropResult.type}!`);
          setDataTableState(state => {
            const listName =
              type === 'DIMENSION'
                ? 'fieldListDimensionList'
                : 'fieldListMatrixList';
            return {
              ...state,
              [listName]: [...state[listName], item],
            };
          });
        }
      },
    }),
    []
  );

  return (
    <DataBoardItemContainer ref={drag}>{item?.name}</DataBoardItemContainer>
  );
};

export default DataboardItem;
