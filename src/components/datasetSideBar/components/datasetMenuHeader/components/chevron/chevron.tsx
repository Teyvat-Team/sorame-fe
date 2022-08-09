import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown, IconChevronUp } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';

interface ChevronUpProps {
  type: 'up' | 'down';
}

const Chevron: React.FC<ChevronUpProps> = (props: ChevronUpProps) => {
  const { type } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1,
        delay: 0,
        ease: 'easeInOut',
      }}
    >
      {type === 'up' ? (
        <IconChevronUp style={withSemiIconStyle()} />
      ) : (
        <IconChevronDown style={withSemiIconStyle()} />
      )}
    </motion.div>
  );
};

export default Chevron;
