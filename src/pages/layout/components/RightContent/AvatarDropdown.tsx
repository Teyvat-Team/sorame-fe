import React, { useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import avatarImg from '@/assets/avatar.png';

import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';

import HeaderDropdown from '../HeaderDropdown';
import classes from './index.module.less';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/user';
import { IconExit, IconUser } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [user, setUser] = useRecoilState(userState);

  const { username, avatar } = user;

  const navigate = useNavigate();
  const location = useLocation();

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    // Note: There may be security issues, please note
    if (location.pathname !== '/login') {
      navigate('/login', {
        replace: true,
      });
    }
  };

  const onMenuClick = useCallback(
    event => {
      const { key } = event;
      if (key === 'logout' && user) {
        setUser({ ...user, logged: false });
        localStorage.removeItem('token');
        loginOut();
        return;
      }
      navigate(`/account/${key}`);
    },
    [user, setUser]
  );

  const menuHeaderDropdown = (
    <Menu className={'menu'} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <IconExit style={withSemiIconStyle()} />
        {`  退出登录`}
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${classes.action} ${classes.account}`}>
        <Avatar alt="avatar" icon={<IconUser />} src={avatarImg} />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
