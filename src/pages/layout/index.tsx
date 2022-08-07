import React, { FC, useEffect, Suspense, useCallback, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { MenuList, MenuChild } from '@/types/menu.interface';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { userState } from '@/stores/user';
import { useRecoilState } from 'recoil';
import { ReactComponent as LogoTitleSvg } from '@/assets/logo/logoAndTitle.svg';

import type { MenuDataItem, ProSettings } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { SmileOutlined, HeartOutlined, FrownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLocale } from '@/locales';
import RightContent from './components/RightContent';

import { layoutSettings } from '../../const/layout';
import ErrorBoundary from '@/components/errorBoundary';

const menuList = [
  {
    path: '/overview',
    name: '概览',
    locale: 'menu.overview',
    icon: 'heart',
  },
];

const IconMap: { [key: string]: React.ReactNode } = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
};

const LayoutPage: FC = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const [pathname, setPathname] = useState('/welcome');
  const { device, collapsed, newUser, settings } = user;
  const isMobile = device === 'MOBILE';
  const location = useLocation();
  const navigate = useNavigate();
  const { formatMessage } = useLocale();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/overview');
    }
  }, [navigate, location]);

  const toggle = () => {
    setUser({ ...user, collapsed: !collapsed });
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];
    menu.forEach(m => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach(mu => {
          MenuListAll.push(mu);
        });
      }
    });
    return MenuListAll;
  };

  const loopMenuItem = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) return [];

    const m = menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));

    return m;
  };

  const [dynamicSettings, _] = useState<Partial<ProSettings> | undefined>(
    layoutSettings
  );

  return (
    <ProLayout
      fixSiderbar
      collapsed={collapsed}
      // ErrorBoundary={false}
      ErrorBoundary={ErrorBoundary}
      location={{
        pathname: location.pathname,
      }}
      logo={() => (
        <LogoTitleSvg
          style={{
            transform: 'translate(-23%, 0%) scale(0.55)',
          }}
        />
      )}
      title={false}
      hasSiderMenu={false}
      onCollapse={toggle}
      formatMessage={formatMessage}
      onMenuHeaderClick={() => {}}
      menuItemRender={(menuItemProps: any, defaultDom: any) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({ id: 'menu.home' }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={() => loopMenuItem(menuList)}
      rightContentRender={() => <RightContent />}
      collapsedButtonRender={() => {
        return (
          <div
            onClick={() => toggle}
            style={{
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            <span id="sidebar-trigger">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>
        );
      }}
      {...dynamicSettings}
    >
      <Outlet />
    </ProLayout>
  );
};

export default LayoutPage;
