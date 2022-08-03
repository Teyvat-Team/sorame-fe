import React, { FC } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginParams } from '@/models/login';
// import { loginAsync } from '@/stores/user.store';
// import { useAppDispatch } from '@/stores';
import { Location } from 'history';
import { useLogin } from '@/api';

import styles from './index.module.less';
import { ReactComponent as LogoSvg } from '@/assets/logo/logo.svg';

const initialValues: LoginParams = {
  username: 'guest',
  password: 'guest',
  // remember: true
};

const LoginForm: FC = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation() as Location<{ from: string }>;

  // const dispatch = useAppDispatch();

  const onFinished = async (form: LoginParams) => {
    // const result = await loginMutation.mutateAsync(form);
    // console.log('result: ', result);

    // response: ({ body }) => {
    //   return {
    //     token: '123abcdefg',
    //     username: body.username,
    //     role: body.username,
    //   };

    // if (result) {
    localStorage.setItem('token', '123abcdefg');

    const from = location.state?.from || { pathname: '/dashboard' };
    navigate(from);
    // }
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
