import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;
import { motion } from 'framer-motion';
import { message, Tree } from 'antd';
import {
  IconChevronDown,
  IconFolderStroked,
  IconModalStroked,
} from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import type { AntTreeNodeProps, DataNode } from 'antd/es/tree';

const { DirectoryTree } = Tree;

const Container = styled.section`
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 12px;
  word-break: break-all;
  margin-top: 12px;
  height: calc(100vh - 340px);
  padding: 0 12px;
  font-size: 14px;
`;

const motionSettings: Partial<React.ComponentProps<typeof motion.div>> = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
  transition: {
    duration: 0.2,
    delay: 0,
    ease: [0, 0.71, 0.2, 1.01],
  },
};

interface TreeWithoutFilterProps {
  data: API.DataSetListResponse['data'];
  onSelect: (selectedItem: DataNode) => any;
}

type TreeData = DataNode[];

const formatTreeData = (data: API.DataSetListResponse['data']): TreeData => {
  if (!data || data.length === 0) {
    return [];
  }

  const treeData: TreeData = [];
  data.forEach(dataset => {
    const { dataSetList } = dataset;
    if (dataSetList.length === 0) {
      return;
    }

    const treeDataSet: DataNode = {
      title: dataSetList[0].name,
      key: dataSetList[0].id,
      icon: (
        <IconFolderStroked
          style={withSemiIconStyle({
            marginRight: '8px',
          })}
        />
      ),
      selectable: false,
      children: dataSetList.map(table => ({
        title: table?.tableName || '',
        key: table?.tableId || table?.tableName || '',
        icon: (
          <IconModalStroked
            style={withSemiIconStyle({
              marginLeft: '-24px',
              marginRight: '8px',
            })}
          />
        ),
        selectable: true,
        datasetId: dataSetList[0].id,
      })),
    };

    treeData.push(treeDataSet);
  });
  return treeData;
};

const TreeWithoutFilter: React.FC<TreeWithoutFilterProps> = (
  props: TreeWithoutFilterProps
) => {
  const { data, onSelect } = props;

  const treeData = useMemo(() => formatTreeData(data), [data]);

  return (
    <Container>
      <motion.div {...motionSettings}>
        <DirectoryTree
          blockNode={true}
          multiple={false}
          showIcon
          defaultExpandAll
          treeData={treeData}
          onSelect={(selectedItems: string[]) => {
            if (selectedItems.length === 0) {
              message.error('未找到数据表');
              return;
            }
            if (selectedItems?.length > 1) {
              message.error('只能选择一个数据表');
              return;
            }
            const id = selectedItems[0];

            let item: DataNode | undefined;
            for (const t of treeData) {
              for (const table of t.children) {
                if (table.key === id) {
                  item = table;
                  break;
                }
              }
              if (item) {
                break;
              }
            }

            if (!item) {
              message.error('未找到数据表');
              return;
            }

            onSelect?.(item);
          }}
          switcherIcon={({ expanded }: AntTreeNodeProps) => {
            return expanded ? (
              <IconChevronDown size="small" />
            ) : (
              <IconChevronDown size="small" />
            );
          }}
        />
      </motion.div>
    </Container>
  );
};

export default TreeWithoutFilter;
