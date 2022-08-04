import React, { FC, useEffect } from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/user';


const PrivateRoute: FC<RouteProps> = ({ children }) => {

  const [user, _] = useRecoilState(userState);

  const logged = user.username ? true : false;


  return logged ? <div>{children}</div> : <Navigate to="/login" />;
};

export default PrivateRoute;
