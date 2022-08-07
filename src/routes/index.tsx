import React, { lazy, FC } from 'react';

import Overview from '@/pages/overview';
import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';
import WrapperRouteComponent from './config';
import { useRoutes, RouteObject } from 'react-router-dom';

const NotFound = lazy(() => import('@/pages/404'));

const routeList: RouteObject[] = [
  {
    path: '/',
    element: (
      <WrapperRouteComponent auth={true}>
        <LayoutPage />
      </WrapperRouteComponent>
    ),
    children: [
      {
        path: '/overview',
        element: (
          <WrapperRouteComponent>
            <Overview />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '*',
        element: (
          <WrapperRouteComponent>
            <NotFound />
          </WrapperRouteComponent>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
