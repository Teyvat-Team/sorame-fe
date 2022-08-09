import React, { FC, useEffect } from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/user';
import { Role } from '@types/login';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);

  const logged = localStorage.getItem('token');

  if (logged) {
    setUser({
      ...user,
      username: localStorage.getItem('username') || 'admin',
      logged: true,
      role: (localStorage.getItem('role') || 'admin') as Role,
    });
  }

  return logged ? <div>{children}</div> : <Navigate to="/login" />;
};

export default PrivateRoute;
