import React , { useEffect, useState } from 'react'

import fetch from '../../../global/http';
// import { UploadOutlined } from '@ant-design/icons';

import { Form, Input, Select, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function CreateTeam(props) {
  const [form] = Form.useForm();

  const id = props.location.search.replace('?id=', '');

  const searchTeamInfo = async () => {
    const res = await fetch.get('/team/searchTeamInfo', { id });
    form.setFieldsValue({
      ...res,
    });
  };
  id && searchTeamInfo();
  

  const [adminList, setAdminList] = useState([]);
  useEffect(() => {
    const searchAdminList = async () => {
     const res = await fetch.get('/user/searchRole', { role: 'admin' });
     setAdminList(res)
    };
    searchAdminList();

  },[])

  const onFinish = async (values) => {
    let adminObj = adminList.find((item)=>item.id===values.administrator_id)
    values.administrator = adminObj.name

    const api = id ? '/team/updateTeamInfo' : '/team/createTeam';
    id && (values.id = id);
    const res = await fetch.post(api, values);
    if (res.code === 200) {
      const mess = id ? '修改成功' : '新增成功';
      console.log('mess', mess);
      message.success(mess);
      setTimeout(() => {
        props.history.push('/admin/teamManage');
      }, 1000);
    } else {
      message.error(res.message);
    }
  };
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
        label="名称"
        rules={[
          {
            required: true,
            message: 'Please input the name',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="administrator_id"
        label="管理员"
        rules={[
          {
            required: true,
            message: 'Please select the administrator!',
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {adminList.map((item) => {
            return <Option value={item.id} key={item.id}> {item.name}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withRouter(CreateTeam);
