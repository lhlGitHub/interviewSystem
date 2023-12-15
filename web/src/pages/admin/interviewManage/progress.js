import React, { useEffect, useState } from 'react';
import fetch from '../../../global/http';
import enums from '../../../global/enum';
import util from '../../../global/utils';

import { Timeline, Modal, Select, message, Button } from 'antd';

import { withRouter } from 'react-router-dom';
const { Option } = Select;
const info = JSON.parse(sessionStorage.getItem('userInfo'));

async function getProgressList(interview_id) {
  const res = await fetch.get('/progress/getProgressList', { interview_id });
  return res;
}

function Progress(props) {
  const id = util.getQueryVariable('id');
  let principal_id = Number(util.getQueryVariable('principal_id'));
  // let userId = info.id.toString()
  const currProgress = util.getQueryVariable('progress');
  const [progList, setProgList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [endReason, setEndReason] = useState();

  const handleOk = async () => {
    const res = await fetch.post('/interview/closeInterview', { interview_id:id,end_reason:endReason });
    if(res.code===200){
      setVisible(false)
    }
  };
  // const handleCancel = async () => {};
  const handleReasChange = async (value) => {
    console.log('value',value)
    setEndReason(value)
  };

  useEffect(() => {
    (async function () {
      console.log('interview_id', id);
      const res = await getProgressList(id);
      setProgList(res);
    })();
  }, []);

  return (
    <div style={{ width: '600px', margin: '60px auto',paddingBottom:'50px' }}>
      <Timeline mode="left">
        {progList.map((item) => {
          return (
            <Timeline.Item label={item.interview_time}>
              <p>{enums.flow[item.progress_status]}</p>
              <p>{item.interviewer}</p>
              <p>{enums.resultMark[item.mark]}</p>
              <p>
                {item.rate} {item.rate ? '分' : ''}
              </p>
              <p>{item.comment}</p>
              {item.is_end ? (
                <>
                  <p>已结束</p>
                  <p>{enums.interviewStatus[item.end_reason]}</p>
                </>
              ) : (
                ''
              )}
            </Timeline.Item>
          );
        })}
      </Timeline>
     
      {principal_id === info.id && currProgress!=8 ? (
        <div style={{textAlign:'center'}}>
          <Button type="primary" onClick={p=>{setVisible(true)}}>
            关闭面试
          </Button>
        </div>
      ) : (
        ''
      )}
      <Modal
        title="选择原因"
        visible={visible}
        onOk={handleOk}
        onCancel={p=>{setVisible(false)}}
      >
        <Select
          placeholder="Select a reason"
          onChange={handleReasChange}
          style={{ width: '300px' }}
        >
          
          {currProgress > 4 ? (
            <>
              <Option value="4">未通过评审</Option>          
              <Option value="5">已接受offer</Option>
              <Option value="6">已拒绝offer</Option>
            </>
          ) : (
            <Option value="2">已拒绝面试</Option>
          )}
        </Select>
      </Modal>
    </div>
  );
}

export default withRouter(Progress);
