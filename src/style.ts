/** Customize global styles here */
import { css } from '@emotion/react';
import { COLOR_PALETTE } from '@/const/theme/color';

const globalStyles = css`
  html {
    font-size: 14px;
  }
  ::-webkit-scrollbar {
    background-color: ${COLOR_PALETTE.SORAME_HEADER_SEARCH_BG}!important;
    border-radius: 10px;
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${COLOR_PALETTE.SORAME_HEADER_SEARCH_BG_HOVER}!important;
    border-radius: 10px;
    width: 8px;
    height: 8px;
  }

  [ant-click-animating-without-extra-node='true']::after {
    animation: none !important;
  }

  .ant-layout-sider {
    background-color: ${COLOR_PALETTE.SORAME_GREY}!important;

    .ant-pro-sider-logo {
      h1 {
        color: ${COLOR_PALETTE.SORAME_BLACK}!important;
      }
    }
  }

  .ant-table-cell {
    background-color: ${COLOR_PALETTE.SORAME_WHITE}!important;
    :hover {
      background-color: ${COLOR_PALETTE.SORAME_INPUT_HOVER_BG}!important;
    }
  }

  .ant-layout-sider-light {
    background-color: ${COLOR_PALETTE.SORAME_GREY}!important;
  }

  .ant-checkbox {
    .ant-checkbox-inner {
      background-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}!important;
    }
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: ${COLOR_PALETTE.SORAME_BLUE}!important;
    }
  }

  .ant-select-focused {
    .ant-select-selector {
      border-color: ${COLOR_PALETTE.SORAME_BLUE}!important;
      box-shadow: none !important;
    }
  }

  .ant-message {
    .ant-message-notice-content {
      max-width: 800px;
    }
  }

  table {
    border-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}!important;
  }
  th {
    background-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}!important;
  }
  hr {
    color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}!important;
  }

  .ant-layout {
    background-color: ${COLOR_PALETTE.SORAME_WHITE};
    .ant-layout-header .ant-pro-header-light {
      height: 48px !important;
      line-height: 48px !important;
      background-color: ${COLOR_PALETTE.SORAME_GREY}!important;
    }
  }

  .ant-pro-basicLayout {
    .ant-layout-header .ant-pro-header-light {
      height: 48px !important;
      line-height: 48px !important;
      background-color: ${COLOR_PALETTE.SORAME_GREY}!important;
    }
  }
  .ant-pro-basicLayout .ant-layout-header.ant-pro-header-light {
    background-color: ${COLOR_PALETTE.SORAME_GREY}!important;
  }

  .ant-layout-header {
    background-color: ${COLOR_PALETTE.SORAME_GREY}!important;
    .ant-pro-global-header {
      background-color: ${COLOR_PALETTE.SORAME_GREY}!important;
    }
  }

  .ant-input {
    :hover {
      border-color: ${COLOR_PALETTE.SORAME_INPUT_HOVER_BG};
      background-color: ${COLOR_PALETTE.SORAME_INPUT_HOVER_BG};
    }
    :focus {
      border-color: ${COLOR_PALETTE.SORAME_BLUE};
      box-shadow: none;
      background-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND};
    }
  }

  .ant-pro-sider-logo {
    cursor: default;
  }

  /* * logo位置
  .ant-pro-sider-logo {
    margin-top: 27px;
  } */

  div.ant-layout {
    height: 100vh;
    .ant-layout-content {
      overflow-y: auto;
      margin: 0;
      padding-top: 24px;
      padding-left: 24px;
      padding-right: 24px;
      overflow-x: hidden;
    }
  }

  .ant-input-password {
    :hover {
      background-color: ${COLOR_PALETTE.SORAME_INPUT_HOVER_BG}!important;
      input {
        background-color: ${COLOR_PALETTE.SORAME_INPUT_HOVER_BG}!important;
      }
    }
    :focus {
      border-color: ${COLOR_PALETTE.SORAME_BLUE};
      box-shadow: none;
    }
    :active {
      border-color: ${COLOR_PALETTE.SORAME_BLUE};
      box-shadow: none;
    }
  }
  .ant-input-affix-wrapper-focused {
    border-color: ${COLOR_PALETTE.SORAME_BLUE}!important;
    box-shadow: none !important;
  }

  .ant-input-affix-wrapper {
    :hover {
      background-color: ${COLOR_PALETTE.SORAME_INPUT_HOVER_BG}!important;
      input {
        background-color: ${COLOR_PALETTE.SORAME_INPUT_HOVER_BG}!important;
      }
    }
    :focus {
      border-color: ${COLOR_PALETTE.SORAME_BLUE};
      box-shadow: none;
    }
    :active {
      border-color: ${COLOR_PALETTE.SORAME_BLUE};
      box-shadow: none;
    }
  }

  .ant-popover-inner-content {
    padding: 0;
  }
`;

/** fix Semi icon align style */
export const withSemiIconStyle: (
  style?: React.CSSProperties | undefined
) => React.CSSProperties = style => ({
  position: 'relative',
  top: 3,
  ...style,
});

export default globalStyles;
