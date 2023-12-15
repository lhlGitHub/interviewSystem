import React, { useEffect, useState } from 'react';

import { Table, Tag, Space, Input, Button ,message} from 'antd';
import { withRouter } from 'react-router-dom';
import fetch from '../../../global/http';
import enums from '../../../global/enum';

const { Search } = Input;
let prop;
const channelMap = {
  0: '内推',
  1: 'boss',
  2: '51job',
  3: '猎聘',
};
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    // render: text => <a>{text}</a>,
  },
  {
    title: '期望职位',
    dataIndex: 'expected_position',
    key: 'expected_position',
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '学历',
    dataIndex: 'education',
    key: 'education',
  },
  {
    title: '专业',
    dataIndex: 'major',
    key: 'major',
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: '是否已离职',
    dataIndex: 'is_leave',
    key: 'is_leave',
    render: (text) => <span>{text === 0 ? '在职' : '离职'}</span>,
  },

  {
    title: '渠道',
    dataIndex: 'channel',
    key: 'channel',
    render: (text) => <span>{channelMap[text]}</span>,
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    // render: tags => (
    //   <>
    //     {tags.map(tag => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //       if (tag === 'loser') {
    //         color = 'volcano';
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text) => <span>{enums.screenStatus[text]}</span>,
  },
  {
    title: '操作',
    key: 'action',
    render: (text) => (
      <Space size="middle">
        <a onClick={p=>prop.history.push(`/resumeDetail?id=${text.id}`)}>查看详情</a>
        <a onClick={(e) => editResume(text)}>编辑</a>
        {/* <a>评论</a> */}
        <a onClick={(e) => delResume(text)}>删除</a>
      </Space>
    ),
  },
];

function editResume(data) {
  console.log('data', data);
  prop.history.push('/createResume?id=' + data.id);
}
async function delResume(data) {
  const res = await fetch.post('/resume/delect', { id: data.id });
  if(res.code===200){
    message.success('删除成功');
    getResumeList();
  }
  
}
async function getResumeList() {
  const res = await fetch.get('/resume/getResumeList', {});
  return res
}

function ResumeManage(props) {
  const [resumeList, setResumeList] = useState([]);
  prop = props;
  useEffect(() => {
  
    (async function(){
      const res = await getResumeList();
      setResumeList(res);
     })() 
  }, []);
  return (
    <div>
      <div className="searchbar" style={{ padding: '10px' }}>
        <Button
          type="primary"
          onClick={(p) => props.history.push('/createResume')}
        >
          新增简历
        </Button>
        <Search
          placeholder="input search text"
          enterButton="Search"
          style={{ width: 300, marginLeft: '20px' }}
          onSearch={(value) => console.log(value)}
        />
      </div>
      <Table columns={columns} dataSource={resumeList} />
    </div>
  );
}
export default withRouter(ResumeManage);
