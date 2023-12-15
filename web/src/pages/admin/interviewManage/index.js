import React, { useEffect, useState } from 'react';

import {
  Table,
  Rate,
  Space,
  Input,
  Modal,
  message,
  Select,
  DatePicker,
  Radio,
} from 'antd';

import { withRouter } from 'react-router-dom';
import fetch from '../../../global/http';
import enums from '../../../global/enum';
import until from '../../../global/utils';
// import moment from 'moment';
const { TextArea } = Input;

// import data  from '../../../mock/resume.js'
const { Search } = Input;
const { Option } = Select;

let prop;

function checkoutProgress(data) {
  prop.history.push(
    `/progress?id=${data.id}&principal_id=${data.principal_id}&progress=${data.progress}`
  );
}
function downLoad() {}

async function delInterview(data) {
  const res = await fetch.post('/interview/delect', { id: data.id });
  if (res.code === 200) {
    message.success('删除成功');
    getInterviewList();
  }
}
async function getInterviewList() {
  const res = await fetch.get('/interview/getInterviewList', {});
  return res;
}
const searchAdminList = async () => {
  const res = await fetch.get('/user/searchRole', { role: 'admin' });
  return res;
};

function InterviewManage(props) {
  const [interviewList, setInterviewList] = useState([]);
  const [visible, setVisible] = useState(false);
  // const [comment, setComment] = useState({ desc: null, rate: null });
  const [isApoint, setIsApoint] = useState([false]);
  const [adminList, setAdminList] = useState([]);
  const [appointObj, setAppointObj] = useState({
    interview_time: null,
    interviewer_id: null,
    interview_id: null,
    interviewer: null,
    mark: null,
    rate: null,
    comment: null,
  });
  const info = JSON.parse(sessionStorage.getItem('userInfo'));
  const columns = (openDialog) => [
    {
      title: '候选人',
      dataIndex: 'candidate',
      key: 'candidate',
    },
    {
      title: '面试岗位',
      dataIndex: 'post',
      key: 'post',
    },
    {
      title: '面试官',
      dataIndex: 'interviewer',
      key: 'interviewer',
    },
    {
      title: '负责hr',
      dataIndex: 'principal',
      key: 'principal',
    },
    {
      title: '预约时间',
      dataIndex: 'order_time',
      key: 'order_time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Space size="middle">{enums.interviewStatus[text]}</Space>
      ),
    },
    {
      title: '当前阶段',
      dataIndex: 'progress',
      key: 'progress',
      render: (text) => <Space size="middle">{enums.flow[text]}</Space>,
    },
    {
      title: '操作',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          {info.id === text.interviewer_id ? (
            <>
              {text.principal_id === text.interviewer_id ? (
                <a onClick={(e) => openDialog(true, text.id)}>指派</a>
              ) : (
                <a onClick={(e) => openDialog(false, text.id)}>评价</a>
              )}
              <a onClick={(e) => checkoutProgress(text)}>查看进度</a>
              <a onClick={(e) => downLoad(text)}>下载简历</a>
            </>
          ) : (
            <>
              <a onClick={(e) => checkoutProgress(text)}>查看进度</a>
              <a href={text.resume_url}>下载简历</a>
            </>
          )}
          {/* <a onClick={(e) => delInterview(text)}>删除</a> */}
        </Space>
      ),
    },
  ];
  function openDialog(isApoint, interview_id) {
    console.log('isApoint', isApoint);
    setAppointObj({ ...appointObj, interview_id });
    setVisible(true);
    setIsApoint(isApoint);
  }
  const handleOk = async () => {
    if (appointObj.interviewer_id) {
      appointObj.interviewer = until.getObjValueById(
        appointObj.interviewer_id,
        'id',
        'name',
        adminList
      );
    } else {
      appointObj.interviewer_id = info.id;
      appointObj.interviewer = info.name;
    }
    console.log('appointObj', appointObj);
    const res = await fetch.post('/progress/createProgress', appointObj);
    if (res.code === 200) {
      message.success('新增成功');
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleChangeRate = (value) => {
    setAppointObj({ ...appointObj, rate: value });
  };
  const handleCommentBlur = (e) => {
    setAppointObj({ ...appointObj, comment: e.target.value });
  };
  const handleItvChange = (value) => {
    setAppointObj({ ...appointObj, interviewer_id: value });
  };
  const onDateChange = (value) => {
    setAppointObj({
      ...appointObj,
      interview_time: new Date(value).toUTCString(),
    });
  };
  const onMarkChange = (e) => {
    setAppointObj({ ...appointObj, mark: e.target.value });
  };

  prop = props;
  useEffect(() => {
    (async function () {
      const res = await getInterviewList();
      setInterviewList(res.data);
      const adminList = await searchAdminList();
      setAdminList(adminList);
    })();
  }, []);
  return (
    <div>
      <div className="searchbar" style={{ padding: '10px' }}>
        {/* <Button type="primary" onClick={p=>props.history.push('/createInterview')}>新增职位</Button> */}
        <Search
          placeholder="input search text"
          enterButton="Search"
          style={{ width: 300, marginLeft: '20px' }}
          onSearch={(value) => console.log(value)}
        />
      </div>
      <Table columns={columns(openDialog)} dataSource={interviewList} />
      <Modal
        title={isApoint ? '指派' : '评价'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical">
          {isApoint ? (
            <Space direction="vertical">
              <div>
                <Select
                  placeholder="Select a person for interviewer"
                  onChange={handleItvChange}
                  style={{ width: '300px' }}
                >
                  {adminList.map((item) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div>
                <DatePicker showTime onChange={onDateChange} />
              </div>
            </Space>
          ) : (
            <div>
              {' '}
              <Space direction="vertical">
                <Radio.Group onChange={onMarkChange}>
                  <Radio value={0}>不通过</Radio>
                  <Radio value={1}>合适</Radio>
                  <Radio value={2}>不合适</Radio>
                </Radio.Group>
                <div>
                  <Rate onChange={handleChangeRate} />
                </div>
                <div>
                  <TextArea
                    placeholder="input comment"
                    onBlur={handleCommentBlur}
                    style={{ width: '300px', marginBottom: '20px' }}
                  />
                </div>
              </Space>
            </div>
          )}
        </Space>
      </Modal>
    </div>
  );
}
export default withRouter(InterviewManage);
