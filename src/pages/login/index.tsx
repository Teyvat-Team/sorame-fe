import React, { FC, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginParams, Role } from '@/types/login';
// import { loginAsync } from '@/stores/user.store';
// import { useAppDispatch } from '@/stores';
import { Location } from 'history';

const currentUser: {
  username: string;
  role: Role;
} = {
  username: 'admin',
  role: 'admin',
};

import styles from './index.module.less';
import { ReactComponent as LogoSvg } from '@/assets/logo/logo.svg';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/user';

const initialValues: LoginParams = {
  username: 'admin',
  password: 'admin',
};

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: { from: string } };

  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    setUser({
      ...user,
      username: currentUser.username,
      logged: true,
      role: currentUser.role,
    });
  }, []);

  const onFinished = async (form: LoginParams) => {
    localStorage.setItem('token', '123abcdefg');
    localStorage.setItem('username', currentUser.username);
    localStorage.setItem('role', currentUser.role);

    const from = location.state?.from || { pathname: '/overview' };
    navigate(from);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <LogoSvg
            style={{
              transform: 'translate(0%, 30%) scale(0.7)',
            }}
          />
          <span className={styles.title}>Sorame 天目</span>
        </div>
        <div className={styles.desc}>
          Sorame 天目 BI（Business Intelligent）系统
        </div>
      </div>
      <div className={styles.main}>
        <Form<LoginParams> onFinish={onFinished} initialValues={initialValues}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住用户</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
