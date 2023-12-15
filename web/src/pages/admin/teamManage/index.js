import React , { useEffect, useState } from 'react'

import { Table, message, Space ,Input,Button} from 'antd';
import {withRouter} from 'react-router-dom'
import fetch from '../../../global/http';

// import data  from '../../../mock/resume.js'
const { Search } = Input;
let prop
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    // r
  },
  {
    title: '管理员',
    dataIndex: 'administrator',
    key: 'administrator',
  },
  {
    title: '成员',
    // dataIndex: 'user_num',
    key: 'user_num',
    render: text => <a onClick={p=>prop.history.push('/admin/userManage?team_id='+text.id)}>{text.user_num}</a>,
  },
  {
    title: '简历',
    // dataIndex: 'resume_num',
    key: 'resume_num',
    render: text => <a href="">{text.resume_num}</a>,

  },
  {
    title: '操作',
    key: 'action',
    render: (text) => (
      <Space size="middle">
        {/* <a>指派</a> */}
        <a onClick={(e) => editTeam(text)}>编辑</a>
        <a onClick={(e) => delTeam(text)}>删除</a>
      </Space>
    ),
  },
];

function editTeam(data) {
  console.log('data', data);
  prop.history.push('/createTeam?id=' + data.id);
}
async function getTeamList() {
  const res = await fetch.get('/team/getTeamList', {});
   return res
}
async function delTeam(data) {
  const res = await fetch.post('/team/delect', { id: data.id });
  if(res.code===200){
    message.success('删除成功');
    getTeamList();
  }
  
}

function TeamManage(props) {
  const [teamList, setTeamList] = useState([]);
  prop = props;
  useEffect(() => {
    (async function(){
      const res = await getTeamList();
      setTeamList(res);
     })()  
  }, []);
  return (
      <div>
         
          <div className="searchbar" style={{padding:'10px'}}>
          <Button type="primary" onClick={p=>props.history.push('/createTeam')}>新增团队</Button>
          {/* <Search
          placeholder="input search text"
          enterButton="Search" style={{ width: 300,marginLeft:'20px' }}
          onSearch={value => console.log(value)}
          /> */}
          </div>
         <Table columns={columns} dataSource={teamList} />
      </div>
  )
}
export default withRouter(TeamManage)
