import React from 'react';
import fetch from '../../../global/http';
import { UploadOutlined } from '@ant-design/icons';

import {
  Form,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Upload,
  message,
} from 'antd';
import { withRouter } from 'react-router-dom';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

// const onFinish = (values) => {
//     console.log('Received values of form: ', values);
//   };

function CreateResume(props) {
  const [form] = Form.useForm();

  const id = props.location.search.replace('?id=', '');

  const searchResumeInfo = async () => {
    const res = await fetch.get('/resume/searchResumeInfo', { id });
    form.setFieldsValue({
      ...res,
    });
  };
  id && searchResumeInfo();

  const handleFileChange = (info) => {
    let fileList = [...info.fileList];
   console.log('fileList',fileList)
    fileList = fileList.slice(-2);
    let result = [];
    fileList.forEach((file) => {
      if (file.response) {
        file.url = file.response.data;
      }
      let { name, size, type, uid, url } = file;
      result.push({ name, size, type, uid, url });
    });
    // console.log('result', JSON.stringify(result));
    form.setFieldsValue({ file: result });
  };

  const onFinish = async (values) => {
    console.log('values', values);
    const api = id ? '/resume/updateResumeInfo' : '/resume/createResume';
    id && (values.id = id);
    values.file = values.file[0].response.data
    const res = await fetch.post(api, values);
    if (res.code === 200) {
      const mess = id ? '修改成功' : '新增成功';
      console.log('mess', mess);
      message.success(mess);
      setTimeout(() => {
        props.history.push('/admin/resumeManage');
      }, 1000);
    } else {
      message.error(res.message);
    }
  };
  const token = sessionStorage.getItem('token');
  const uploadParams = {
    name: 'file',
    action: 'http://127.0.0.1:7001/resume/upload',
    headers: {
      Authorization: token,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        // handleFileChange(info);
        // form.setFieldsValue({ file: info.fileList[0].response.data });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Form
      form={form}
      style={{ width: '600px', margin: '100px auto' }}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="name"
        label="姓名"
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
        name="expected_position"
        label="期望职位"
        rules={[
          {
            required: true,
            message: 'Please input the expected position!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="手机号"
        rules={[
          {
            required: true,
            message: 'Please input mobile',
          },
        ]}
      >
        <Input type="number" />
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
            message: 'Please input the E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="age"
        label="年龄"
        rules={[
          {
            type: 'integer',
            message: 'The input is not valid age!',
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="education"
        label="学历"
        rules={[
          {
            required: true,
            message: 'Please input education',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="major"
        label="专业"
        rules={[
          {
            required: true,
            message: 'Please input major',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="city" label="城市">
        <Input />
      </Form.Item>
      <Form.Item name="is_leave" label="是否已离职" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="channel" label="渠道">
        <Radio.Group>
          <Radio value={1}> 内推 </Radio>
          <Radio value={2}> boss</Radio>
          <Radio value={3}>51job</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="tags" label="标签">
        <Input />
      </Form.Item>
      <Form.Item
        name="file"
        label="上传简历"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="简历大小不能超过2M"
      >
        <Upload {...uploadParams}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
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
