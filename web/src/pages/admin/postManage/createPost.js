import React, { useEffect, useState } from 'react';

import fetch from '../../../global/http';
import { Form, Input, Select, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import util from '../../../global/utils';

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function CreatePost(props) {
  const [form] = Form.useForm();

  const id = util.getQueryVariable('id');
  const ischeck = util.getQueryVariable('isCheck');

  const searchPostInfo = async () => {
    const res = await fetch.get('/post/searchPostInfo', { id });
    form.setFieldsValue({
      ...res,
    });
    setPostInfo(res)
  };

  const [teamList, setTeamList] = useState([]);
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    async function getTeamList() {
      const res = await fetch.get('/team/getTeamList', {});
      // console.log('res', res);
      setTeamList(res);
    }

    getTeamList();
    if (id || ischeck) {
      searchPostInfo();
    }
  }, []);

  const onFinish = async (values) => {
    let teamObj = teamList.find((item) => item.id === values.team_id);
    values.team = teamObj.name;

    const api = id ? '/post/updatePostInfo' : '/post/createPost';
    id && (values.id = id);
    const res = await fetch.post(api, values);
    if (res.code === 200) {
      const mess = id ? '修改成功' : '新增成功';
      console.log('mess', mess);
      message.success(mess);
      setTimeout(() => {
        props.history.push('/admin/postManage');
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
        {ischeck ? <>{postInfo.name}</> : <Input />}
      </Form.Item>
      <Form.Item
        name="team_id"
        label="团队"
        rules={[
          {
            required: true,
            message: 'Please select the team!',
          },
        ]}
      >
        {ischeck ? <>{postInfo.team}</> : 

        <Select
          showSearch
          placeholder="Select a team"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {teamList.map((item) => {
            return (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
        }
      </Form.Item>
      <Form.Item
        name="post_detail"
        label="职位详情"
        rules={[
          {
            required: true,
            message: 'Please input the post detail',
          },
        ]}
      >
        {ischeck ? <>{postInfo.post_detail}</> : <TextArea rows={6} />}
        
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      {!ischeck ?
        <Button type="primary" htmlType="submit">
          提交
        </Button>:''}
      </Form.Item>
    </Form>
  );
}

export default withRouter(CreatePost);
