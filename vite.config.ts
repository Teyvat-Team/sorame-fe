import type { UserConfigExport, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import { getAliases } from 'vite-aliases';

import styleImport from 'vite-plugin-style-import';
import { MEASUREMENT } from './src/const/theme/measurement';
import { COLOR_PALETTE } from './src/const/theme/color';
import react from '@vitejs/plugin-react';

const aliases = getAliases();

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default ({ command }: { command: string }) => {
  console.log('command:');
  return {
    resolve: {
      // alias: aliases,
      alias: [
        {
          // /@/xxxx  =>  src/xxx
          find: /^~/,
          replacement: pathResolve('node_modules') + '/',
        },
        {
          // /@/xxxx  =>  src/xxx
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    optimizeDeps: {
      include: ['@ant-design/colors', '@ant-design/icons'],
    },
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://127.0.0.1:7770',
    //       changeOrigin: true,
    //       rewrite: path => path.replace(/^\/api/, '')
    //     }
    //   },
    // },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
          ignore: ['node_modules', 'assets'],
        },
      }),
      svgr(),
      viteMockServe({
        mockPath: 'mock',
        supportTs: true,
        watchFiles: true,
        localEnabled: command === 'serve',
        logger: true,
      }),
      // styleImport({
      //   libs: [
      //     {
      //       libraryName: 'antd',
      //       esModule: true,
      //       resolveStyle: (name) => {
      //         return `antd/es/${name}/style/index`;
      //       },
      //     },
      //   ],
      // }),
    ],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            /** theme Customization
             * https://ant.design/docs/react/customize-theme
             */
            'primary-color': `${COLOR_PALETTE.SORAME_BLUE}`,
            'link-color': `${COLOR_PALETTE.SORAME_LIGHT_BLACK}`,
            'component-background': `${COLOR_PALETTE.SORAME_WHITE}`,
            'primary-color-hover': `${COLOR_PALETTE.SORAME_LIGHT_BLUE}`,
            'border-radius-base': `${MEASUREMENT.SORAME_BORDER_RADIUS_BASE}`,
            'border-color-base': `${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}`,
            'border-color-split': `${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}`,
            'background-color-base': `${COLOR_PALETTE.SORAME_WHITE}`,
            'item-hover-bg': `${COLOR_PALETTE.SORAME_INPUT_HOVER_BG}`,
            // 'primary-1': `${COLOR_PALETTE.SORAME_LIGHT_BLUE}`,

            /** Layout */

            /** Tips color */
            'success-color': `${COLOR_PALETTE.SORAME_GREEN}`,
            'warning-color': `${COLOR_PALETTE.SORAME_YELLOW}`,
            'error-color': `${COLOR_PALETTE.SORAME_RED}`,

            /** Input */
            'input-bg': `${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}`,
            'input-placeholder-color': `${COLOR_PALETTE.SORAME_INPUT_PLACEHOLDER_COLOR}`,
            'input-border-color': `${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}`,
            'input-hover-border-color': `${COLOR_PALETTE.SORAME_INPUT_HOVER_BG}`,

            /** Table */
            'table-bg': `${COLOR_PALETTE.SORAME_WHITE}`,
            'table-header-bg': `${COLOR_PALETTE.SORAME_WHITE}`,
            'table-row-hover-bg': `${COLOR_PALETTE.SORAME_INPUT_HOVER_BG}`,
            'table-border-color': `${COLOR_PALETTE.SORAME_WHITE}`,
            'table-header-cell-split-color': `${COLOR_PALETTE.SORAME_WHITE}`,

            /** Select */
            'select-background': `${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}`,
            'select-item-selected-color': `${COLOR_PALETTE.SORAME_BLUE}`,

            /** Pagination */
            'pagination-item-bg': `${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}`,
            'pagination-item-bg-active': `${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}`,
            'pagination-item-input-bg': `${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}`,
            'pagination-item-link-bg': `${COLOR_PALETTE.SORAME_INPUT_BACKGROUND}`,
          },
        },
      },
    },
  };
};
