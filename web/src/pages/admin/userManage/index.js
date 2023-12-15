import React, { useEffect, useState } from 'react';

import { Table, message, Space, Input, Button, Select ,Pagination} from 'antd';
import { withRouter } from 'react-router-dom';
import fetch from '../../../global/http';
import util from '../../../global/utils';

// import data  from '../../../mock/users.js'
const { Search } = Input;
const { Option } = Select;

let prop;
const teamMap = {
  frontEnd: '前端组',
  afterEnd: '后端组',
  product: '产品组',
  designer: '设计组',
};
// const [queryparams, setQueryparams] = useState({name:null,team_id:null});
let queryparams = {
  current:1,pageSize:10,
};
function UserManage(props) {
  prop = props;
  const [userList, setUserList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [total, setTotal] = useState(0);

  const team_id = util.getQueryVariable('team_id');
  team_id && (queryparams.team_id = team_id);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
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
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '归属组',
      dataIndex: 'team',
      key: 'team',
      render: (text) => <Space size="middle">{text}</Space>,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '操作',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <a>指派</a>
          <a onClick={(e) => editUser(text)}>编辑</a>
          <a onClick={(e) => delUser(text)}>删除</a>
        </Space>
      ),
    },
  ];
  function editUser(data) {
    console.log('data', data);
    prop.history.push('/createUser?id=' + data.id);
  }

  async function delUser(data) {
    const res = await fetch.post('/user/delect', { id: data.id });
    if (res.code === 200) {
      message.success('删除成功');
      getUserList();
    }
  }
  async function getUserList() {
    console.log('queryparams', queryparams);
    const res = await fetch.get('/user/getUserList', queryparams);
    setUserList(res.data.rows);
    setTotal(res.data.count)
  }
  async function getTeamList() {
    const res = await fetch.get('/team/getTeamList', {});
    setTeamList(res);
  }
  function search(value) {
    // setQueryparams({...queryparams,name:value})
    console.log('queryparams', queryparams);
    queryparams.name = value;

    getUserList();
  }
  function onTeamchange(value) {
    // console.log('{...queryparams,team_id:value}',{...queryparams,team_id:value})
    // setQueryparams({...queryparams,team_id:value})
    queryparams.team_id = value;
    console.log('queryparams11', queryparams);
    getUserList();
  }
  function pageChange(curr,pagesize){
    queryparams.current=curr
    console.log(curr,pagesize)
    getUserList();
  }

  useEffect(() => {
    (async function () {
      const res = await getUserList();
      getTeamList();
    })();
  }, []);

  return (
    <div>
      <div className="searchbar" style={{ padding: '10px' }}>
        <Button
          type="primary"
          onClick={(p) => props.history.push('/createUser')}
        >
          新增用户
        </Button>
        <Search
          placeholder="input username"
          enterButton="Search"
          style={{ width: 300, marginLeft: '20px', marginRight: '20px' }}
          onSearch={(value) => search(value)}
        />

        <Select
          showSearch
          placeholder="Select a team"
          style={{ width: 200, marginLeft: '20px', marginRight: '20px' }}
          optionFilterProp="children"
          onChange={onTeamchange}
          filterOption={(input, option) =>
            option.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
      </div>
      <Table
        columns={columns}
        dataSource={userList}
        rowKey={(columns) => columns.id}
        pagination={{defaultCurrent:1, total,pageSize:10,onChange:pageChange}} 
      />
    </div>
  );
}
export default withRouter(UserManage);
