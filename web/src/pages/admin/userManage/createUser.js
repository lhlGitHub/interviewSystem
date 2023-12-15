import React , { useEffect, useState } from 'react'

import fetch from '../../../global/http';
import { withRouter } from 'react-router-dom';

import { Form, Input, Button, Select, message } from 'antd';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function CreateResume(props) {
  const [form] = Form.useForm();

  const id = props.location.search.replace('?id=', '');

  const getUserInfo = async () => {
    const res = await fetch.get('/user/searchUserInfo', { id });
    form.setFieldsValue({
      ...res,
    });
  };
  id && getUserInfo();

  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    async function getTeamList() {
      const res = await fetch.get('/team/getTeamList', {});
      // console.log('res', res);
      setTeamList(res);
    }

    getTeamList();
  }, []);

  const onFinish = async (values) => {
    let teamObj = teamList.find((item)=>item.id===values.team_id)
    values.team = teamObj.name
    const api = id ? '/user/updateUserInfo' : '/user/register';
    id &&( values.id = id);
    // console.log('values',values)
    const res = await fetch.post(api, values);
    if (res.code === 200) {
      const mess = id ? '修改成功' : '新增成功'
      console.log('mess',mess)
      message.success(mess);
      setTimeout(() => {
        props.history.push('/admin/userManage');
      }, 1000);
    } else {
      message.error(res.message);
    }
  };
  const handleRoleChange = () => {};
  const handleTeamChange = () => {};

  return (
    <Form
      form={form}
      style={{ width: '600px', margin: '100px auto' }}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="姓名"
        rules={[
          {
            required: true,
            message: 'Please input name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="mobile" label="手机号">
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="role"
        label="角色"
        rules={[
          {
            required: true,
            message: 'Please select role!',
          },
        ]}
      >
        <Select
          style={{ width: 120 }}
          onChange={handleRoleChange}
        >
          <Option value="user">成员</Option>
          <Option value="admin">管理员</Option>
          <Option value="superAdmin">超管</Option>
          {/* <Option value="interviewer">面试官</Option> */}
        </Select>
      </Form.Item>

      <Form.Item
        name="team_id"
        label="归属组"
        rules={[
          {
            required: true,
            message: 'Please select team!',
          },
        ]}
      >
        <Select

          style={{ width: 120 }}
          onChange={handleTeamChange}
        >
           {teamList.map((item) => {
            return <Option value={item.id} key={item.id}> {item.name}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: 'Please input username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="初始密码"
        rules={[
          {
            required: true,
            message: 'Please input password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withRouter(CreateResume);
