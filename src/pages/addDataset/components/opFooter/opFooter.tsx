import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { COLOR_PALETTE } from '@const/theme/color';

const { useRef, useState, useEffect, useMemo } = React;

interface OpFooterProps {
  style?: React.CSSProperties;
}

const FooterWrapperSection = styled.section`
  border: none;
  padding: 0;
  padding-left: 12;
  padding-right: 12;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  /* position: absolute; */
  bottom: 0;
  height: 48px;
  border-top: 2px solid ${COLOR_PALETTE.SORAME_GREY};
  z-index: 100;
  background-color: ${COLOR_PALETTE.SORAME_WHITE};
`;

const OpFooter: React.FC<OpFooterProps> = (
  props: React.PropsWithChildren<OpFooterProps>
) => {
  const { children, style = {}, ...args } = props;

  return (
    <FooterWrapperSection {...args} style={style}>
      {children}
    </FooterWrapperSection>
  );
};

export default OpFooter;
