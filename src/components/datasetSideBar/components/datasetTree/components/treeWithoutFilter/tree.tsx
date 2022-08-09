import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;
import { motion, AnimatePresence } from 'framer-motion';

interface TreeWithoutFilterProps {
  data: API.DataSetListResponse['data'];
  onSelect: (selectedItem: any) => any;
}

const TreeWithoutFilter: React.FC<TreeWithoutFilterProps> = (
  props: TreeWithoutFilterProps
) => {
  const { data, onSelect } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{
        duration: 0.2,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {JSON.stringify(data)}
    </motion.div>
  );
};

export default TreeWithoutFilter;
