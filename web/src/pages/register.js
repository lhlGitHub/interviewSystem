import React from 'react';
// import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import apiUrl from '../global/api';
import fetch from '../global/http';
import { Form, Input, Button, message } from 'antd';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
};

function register(props) {
  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword)
      return message.error('密码不一致');
    const res = await fetch.post('/user/register', values);
    if (res.code === 200) {
      props.history.push('/login');
    } else {
      message.error(res.message);
    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        width: '600px',
        margin: '100px auto',
        border: '1px solid #f4f4f4',
        padding: '20px',
      }}
    >
      <h1>欢迎注册</h1>
      <Form
        style={{
          padding: '20px',
        }}
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default withRouter(register);
