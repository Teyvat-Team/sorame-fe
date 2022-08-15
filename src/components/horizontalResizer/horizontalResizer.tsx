import { COLOR_PALETTE } from '@/const/theme/color';
import styled from '@emotion/styled';

const HorizontalResizerSection = styled.section`
  width: 100%;
  height: 10px;
  cursor: row-resize;
  background-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
  box-sizing: border-box;
  transition: all 0.3s;
  z-index: 100;

  :hover {
    background-color: ${COLOR_PALETTE.SORAME_INPUT_HOVER_BG};
    .semi-icon-more_stroked {
      color: ${COLOR_PALETTE.SORAME_BLUE}!important;
    }
  }
`;

export default HorizontalResizerSection;
