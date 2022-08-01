import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { COLOR_PALETTE } from '../const/theme/color';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: COLOR_PALETTE.SORAME_BLUE,
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  title: 'Sorame',
  colorWeak: false,
  pwa: false,
  iconfontUrl: '',
};

export default Settings;
