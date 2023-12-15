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
    // render: text => <a>{text}</a>,
  },
  {
    title: '职位详情',
    dataIndex: 'post_detail',
    key: 'post_detail',
    width:'400px',
    render: text => <span>{text.slice(0,25)}...</span>,
  },
 
  {
    title: '团队',
    dataIndex: 'team',
    key: 'team',
  },
  {
    title: '操作',
    key: 'action',
    render: (text) => (
      <Space size="middle">
        {/* <a>指派</a> */}
        <a onClick={(e) => editPost(text,1)}>查看详情</a>
        <a onClick={(e) => editPost(text)}>编辑</a>
        <a onClick={(e) => delPost(text)}>删除</a>
       

      </Space>
    ),
  },
];

function editPost(data,isCheck) {
  console.log('data', data);
  prop.history.push(`/createPost?id=${data.id}&isCheck=${isCheck}`);
}
async function delPost(data) {
  const res = await fetch.post('/post/delect', { id: data.id });
  if(res.code===200){
    message.success('删除成功');
    getPostList();
  }
  
}
async function getPostList() {
  const res = await fetch.get('/post/getPostList', {});
 return res.data
}


function PostManage(props) {
  const [postList, setPostList] = useState([]);
  prop = props;
  useEffect(() => {
    (async function(){
      const res = await getPostList();
      setPostList(res);
     })()  
    
  }, []);
  return (
      <div>
         
          <div className="searchbar" style={{padding:'10px'}}>
          <Button type="primary" onClick={p=>props.history.push('/createPost')}>新增职位</Button>
          <Search
          placeholder="input search text"
          enterButton="Search" style={{ width: 300,marginLeft:'20px' }}
          onSearch={value => console.log(value)}
          />
          </div>
         <Table columns={columns} dataSource={postList} />
      </div>
  )
}
export default withRouter(PostManage)
