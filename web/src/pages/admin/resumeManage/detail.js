import React, { useEffect, useState } from 'react';
import fetch from '../../../global/http';
// import { UploadOutlined } from '@ant-design/icons';
import util from '../../../global/utils';
import { Divider, Card, Button, Modal, Select, message, Input } from 'antd';
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
const channelMap = {
  0: '内推',
  1: 'boss',
  2: '51job',
  3: '猎聘',
};

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

function ResumeDetail(props) {
  const id = util.getQueryVariable('id');
  // const resume_url = util.getQueryVariable('resume_url');

  
  const [resume, setResume] = useState([]);
  const [visible, setVisible] = useState(false);
  const [appointObj, setAppointObj] = useState({progress:null,interviewer_id:null});


  const approve = (status) => {
    fetch.post('/resume/approve', { id, status }).then((res) => {
      if (res.code !== 200) {
        message.error(res.message);
        return;
      }
      message.success(status == 1 ? '审批通过成功' : '审批不通过成功');
    });
  };
  const handleOk = async () => {
    // console.log('appointObj',appointObj)
    let params = {resume_id:id,resume_url:resume.file,...appointObj}
    let obj  = adminList.find(item=>item.id===appointObj.interviewer_id)
    // params.principal_id = ppointObj.interviewer_id
    params.interviewer =  obj.name
    // params.principal =  obj.name

    const res = await fetch.post('/interview/createInterview', params);
    // console.log('createinterview',res)
    if(res.code!==200){
      message.error(res.message) 
      return
    }
    message.success('指定成功')
    setTimeout(() => {
      handleCancel()
      props.history.push('/admin/interview')
    }, 1000);
  };
  const handleCancel = () => {
    setVisible(false)
  };
  const handleProgBlur = (e) => {
    console.log('appointObj',appointObj)

    setAppointObj({...appointObj,progress:e.target.value})

  };
  const handleItvChange = (value) => {

    setAppointObj({...appointObj,interviewer_id:value})
  };
  const preview=(url)=>{
   window.open(url.slice(1))
  }
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    const searchResumeInfo = async () => {
      const res = await fetch.get('/resume/searchResumeInfo', { id });
      setResume(res);
    };
    searchResumeInfo();

    const searchAdminList = async () => {
      const res = await fetch.get('/user/searchRole', { role: 'admin' });
      setAdminList(res);
    };
    searchAdminList();
    //   console.log('resume',resume)
  }, []);

  const gridStyle = {
    width: '33.333%',
    textAlign: 'left',
    boxShadow: 'none',
  };

  return (
    <div
      className="resume-detail"
      style={{ width: '800px', margin: '100px auto' }}
    >
      <Card title="基本信息">
        <Card.Grid hoverable={false} style={gridStyle}>
          姓名:{resume.name}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          期望职位：{resume.expected_position}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          手机号码：{resume.mobile}
        </Card.Grid>

        <Card.Grid hoverable={false} style={gridStyle}>
          年龄:{resume.age}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          学历：{resume.education}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          专业：{resume.major}
        </Card.Grid>
        <Divider />
        <Card.Grid hoverable={false} style={gridStyle}>
          是否已离职:{resume.is_leave === 0 ? '在职' : '离职'}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          渠道：{channelMap[resume.channel]}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          所属团队：{resume.under_team}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          标签：{resume.tag}
        </Card.Grid>
        {/* <Card.Grid hoverable={false} style={gridStyle}>
          <a>预览简历</a>
        </Card.Grid> */}
      </Card>
      <div
        className="handle-group"
        style={{
          width: '400px',
          margin: '40px auto 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button type="primary" onClick={(p) => preview(resume.file)}>预览简历</Button>

        {resume.status === 0 &&
        (userInfo.role === 'admin' || userInfo.role === 'superAdmin') ? (
          <>
            <Button type="primary" onClick={(p) => approve(1)}>
              筛选通过
            </Button>
            <Button type="primary" onClick={(p) => approve(2)}>
              筛选不通过
            </Button>
          </>
        ) : (
          ''
        )}
        {resume.status === 1 &&
        (userInfo.role === 'admin' || userInfo.role === 'superAdmin') ? (
          <Button type="primary" onClick={(p) => setVisible(true)}>
            指定
          </Button>
        ) : (
          ''
        )}
      </div>

      <Modal
        title="指定面试负责hr"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* <Input placeholder="input current progress"  onBlur={handleProgBlur} style={{width:'300px',marginBottom:'20px'}}/> */}
        <Select placeholder="Select a person for interviewer"  onChange={handleItvChange} style={{width:'300px'}}>
          {adminList.map((item) => {
            return (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </Modal>
    </div>
  );
}

export default withRouter(ResumeDetail);
