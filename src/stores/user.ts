import { atom } from 'recoil';

import { LoginParams, Role } from '@/types/login';
import { Locale, User } from '@/types/user';
import defaultSettings from '@/config/defaultSettings';
import { Settings } from '@ant-design/pro-layout';

export function getGlobalState() {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
    ? 'MOBILE'
    : 'DESKTOP';
  const collapsed = device !== 'DESKTOP';
  const settings: Settings = { ...defaultSettings };
  return {
    device,
    collapsed,
    settings,
  } as const;
}

const initialState: User = {
  ...getGlobalState(),
  noticeCount: 0,
  locale: (localStorage.getItem('locale')! ||
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    'en-us') as Locale,
  newUser: JSON.parse(localStorage.getItem('newUser')!) ?? true,
  logged: false,
  menuList: [],
  username: localStorage.getItem('username') || '',
  role: (localStorage.getItem('username') || '') as Role,
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
};

export const userState = atom({
  key: 'userState',
  default: initialState,
});
