/** Customize global styles here */
import { css } from '@emotion/react';
import { COLOR_PALETTE } from '@/const/theme/color';
import { MEASUREMENT } from '@const/theme/measurement';

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

    .ant-tree {
      background-color: ${COLOR_PALETTE.SORAME_GREY}!important;
      line-height: 1.8;
    }

    .ant-tree .ant-tree-node-content-wrapper .ant-tree-iconEle {
      display: inline !important;
    }

    .ant-tree-treenode {
      padding-top: 4px !important;
      /* display: flex!important;
      align-items: center!important;
      justify-content: center!important;
      cursor: pointer!important;
      transition: all 0.3s !important;
      padding-bottom: 8px !important;

      .ant-tree-switcher {
        display: flex!important;
      } */

      .ant-tree-node-content-wrapper {
        /* display: flex!important;
        align-items: center!important;
        justify-content: center!important;
        flex: 1!important;
        width: 100%!important; */
      }

      /* width: 188px!important;
      max-width: 188px!important; */
      :hover {
        cursor: pointer !important;
        background-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}!important;
      }
      :active {
        cursor: pointer !important;
        background-color: ${COLOR_PALETTE.SORAME_MENU_SELECTED_BG}!important;
      }
      /* .ant-tree-title {
        width: 100%!important;
      } */
    }
    .ant-tree-node-selected {
      background-color: ${COLOR_PALETTE.SORAME_MENU_SELECTED_BG}!important;
      color: ${COLOR_PALETTE.SORAME_BLACK}!important;
      :hover {
        cursor: pointer !important;
        background-color: ${COLOR_PALETTE.SORAME_MENU_SELECTED_BG}!important;
      }
    }
    .ant-tree.ant-tree-directory .ant-tree-treenode-selected::before {
      background-color: ${COLOR_PALETTE.SORAME_MENU_SELECTED_BG}!important;
    }
    .ant-tree-treenode-selected {
      background-color: ${COLOR_PALETTE.SORAME_MENU_SELECTED_BG}!important;
      :hover {
        cursor: pointer !important;
        background-color: ${COLOR_PALETTE.SORAME_MENU_SELECTED_BG}!important;
      }
      .ant-tree-indent {
        background-color: ${COLOR_PALETTE.SORAME_MENU_SELECTED_BG}!important;
        :hover {
          cursor: pointer !important;
          background-color: ${COLOR_PALETTE.SORAME_MENU_SELECTED_BG}!important;
        }
      }
      .ant-tree-switcher {
        background-color: ${COLOR_PALETTE.SORAME_MENU_SELECTED_BG}!important;
        :hover {
          cursor: pointer !important;
          background-color: ${COLOR_PALETTE.SORAME_MENU_SELECTED_BG}!important;
        }
      }
    }
  }
  .ant-pro-sider-menu {
    .ant-menu-item {
      padding-left: 22px !important;
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
      margin: 0;
      overflow-y: hidden;
      padding-top: 0px;
      padding-left: 0px;
      padding-right: 0px;
      overflow-x: hidden;
      max-height: calc(100vh - 48px);
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

  .ant-card {
    box-shadow: 5px 5px 10px ${COLOR_PALETTE.SORAME_HEADER_SEARCH_BG_HOVER};
    transition: all 0.3s ease;
    :hover {
      background-color: ${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}!important;
      box-shadow: 5px 5px 10px ${COLOR_PALETTE.SORAME_HEADER_SEARCH_BG_HOVER};
    }
  }
  .ant-card-head {
    border-bottom: none !important;
  }
  .ant-modal-content {
    border-radius: ${MEASUREMENT.SORAME_MODAL_BORDER_RADIUS}!important;
  }
  .ant-modal-header {
    border-radius: 12px 12px 0 0!important;
    border-bottom: none!important;
  }
  .ant-modal-footer {
    border-top: none!important;
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
