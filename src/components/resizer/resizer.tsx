import { COLOR_PALETTE } from '@/const/theme/color';
import styled from '@emotion/styled';

const ResizerSection = styled.section`
  width: 10px;
  height: 100%;
  z-index: 2;
  cursor: col-resize;
  background-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
  box-sizing: border-box;
  transition: all 0.3s;
  z-index: 100;

  :hover {
    background-color: ${COLOR_PALETTE.SORAME_INPUT_HOVER_BG};
  }
`;

export default ResizerSection;
