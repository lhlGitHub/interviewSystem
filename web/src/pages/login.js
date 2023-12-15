import React from 'react'
// import { useHistory } from "react-router-dom";
import {withRouter} from 'react-router-dom'
import fetch from '../global/http';
import { Form, Input, Button, Checkbox,message } from 'antd';
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


function login(props) {
    
  const onFinish = async (values) => {
   
    const res = await fetch.post('/user/login', {
      username: values.username,
      password: values.password,
    });
    console.log('res',res)
    if (res.code === 200) {
      message.success(res.message);
      sessionStorage.setItem('token',res.data.token)
      sessionStorage.setItem('userInfo', JSON.stringify(res.data.user));
      props.history.push('/admin/home');
    } else {
      message.error(res.message);
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <div style={{  width: '600px',margin: '100px auto',border: '1px solid #f4f4f4',padding: '20px'}}>
    <h1>登陆</h1>
    <Form style={{
  
    padding: '20px'
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

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox> 记住我 </Checkbox>  <a onClick={p=>props.history.push('/register')}>去注册</a>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};
export default withRouter(login)

