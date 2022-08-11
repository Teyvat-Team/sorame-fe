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
import DatasetSideBar from '@/components/datasetSideBar';
import {
  IconChevronLeft,
  IconChevronRight,
  IconDesktop,
  IconPlus,
} from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import { COLOR_PALETTE } from '@/const/theme/color';
import { Button } from 'antd';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import NewDatasetModal from '@components/newDatasetModal';

const menuList = [
  {
    path: '/overview',
    name: '概览',
    locale: 'menu.overview',
    icon: 'overview',
  },
];

const createSetIconStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '24px',
  marginBottom: '24px',
};

const renderNavFooter: () => React.ReactNode = () => <DatasetSideBar />;

const navIconStyle: React.CSSProperties = {
  // marginLeft: 16,
  marginRight: 8,
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

  const IconMap: { [key: string]: React.ReactNode } = {
    overview: (
      <IconDesktop
        style={withSemiIconStyle({
          ...navIconStyle,
          marginLeft: user.collapsed ? -6 : 0,
          marginRight: user.collapsed ? 16 : 8,
        })}
      />
    ),
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

  const handleHeaderClick = useCallback(() => {
    navigate('/overview');
  }, []);

  return (
    <ProLayout
      fixSiderbar
      ErrorBoundary={ErrorBoundary}
      location={{
        pathname: location.pathname,
      }}
      logo={() => (
        <section
          css={css`
            display: flex;
            flex-direction: column;
            width: 176px;
            padding: 0;
            margin: 0;
          `}
        >
          <LogoTitleSvg
            onClick={handleHeaderClick}
            style={{
              transform: user.collapsed
                ? 'translate(-23%, 0%) scale(0.55)'
                : 'translate(-19.5%, 0%) scale(0.55)',
            }}
          />
          {!user.collapsed && (
            <NewDatasetModal
              modalProps={{
                title: '新建数据集',
              }}
              buttonElement={
                <Button
                  shape="round"
                  style={{
                    ...createSetIconStyle,
                    background: COLOR_PALETTE.SORAME_HEADER_SEARCH_BG,
                  }}
                  icon={
                    <IconPlus
                      style={{
                        marginRight: '12px',
                      }}
                    />
                  }
                >
                  新建数据集
                </Button>
              }
            ></NewDatasetModal>
          )}
        </section>
      )}
      title={false}
      hasSiderMenu={false}
      onCollapse={toggle}
      formatMessage={formatMessage}
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
      menuFooterRender={user.collapsed ? undefined : renderNavFooter}
      menuDataRender={() => loopMenuItem(menuList)}
      rightContentRender={() => <RightContent />}
      headerContentRender={() => {
        return (
          <div
            onClick={toggle}
            style={{
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {collapsed ? (
              <IconChevronRight
                style={withSemiIconStyle({
                  color: COLOR_PALETTE.SORAME_HEADER_SEARCH_BG_HOVER,
                })}
              />
            ) : (
              <IconChevronLeft
                style={withSemiIconStyle({
                  color: COLOR_PALETTE.SORAME_HEADER_SEARCH_BG_HOVER,
                })}
              />
            )}
          </div>
        );
      }}
      collapsedButtonRender={false}
      collapsed={user.collapsed}
      {...dynamicSettings}
    >
      <Outlet />
    </ProLayout>
  );
};

export default LayoutPage;
