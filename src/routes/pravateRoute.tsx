import React, { FC, useEffect } from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/user';
import { Role } from '@/types/login';

const currentUser: {
  username: string;
  role: Role;
} = {
  username: 'decker',
  role: 'admin',
};

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);

  const logged = localStorage.getItem('token');

  // if (logged) {
  //   setUser({
  //     ...user,
  //     username: currentUser.username,
  //     logged: true,
  //     role: currentUser.role,
  //   });
  // }

  return logged ? <div>{children}</div> : <Navigate to="/login" />;
};

export default PrivateRoute;
