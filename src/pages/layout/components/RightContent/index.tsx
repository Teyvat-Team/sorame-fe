import { Tag, Space, Menu } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';

import Avatar from './AvatarDropdown';
import HeaderDropdown from '../HeaderDropdown';
// import "./index.less";
import classes from './index.module.less';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/user';
import SelectLang from './SelectLang';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@/const/theme/color';

export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  const { settings } = user;
  let className = classes.right;

  if (
    (settings.navTheme === 'dark' && settings.layout === 'top') ||
    settings.layout === 'mix'
  ) {
    className = `${classes.right} ${classes.dark}`;
  } else {
    className = `${classes.right} ${classes.light}`;
  }
  return (
    <Space className={className}>
      {/* <HeaderDropdown
        className={classes.action}
        overlay={
          <Menu>
            <Menu.Item
              onClick={() => {
                window.open('/~docs');
              }}
            >
              文档
            </Menu.Item>
          </Menu>
        }
      >
        <span>
          <IconHelpCircle
            size="extra-large"
            style={{
              color: COLOR_PALETTE.SORAME_HEADER_SEARCH_BG_HOVER,
            }}
          />
        </span>
      </HeaderDropdown> */}
      {/* <SelectLang className={classes.action} /> */}
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
