
'use strict';
/*
* 面试表
*/
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const Interview = app.model.define('interview', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      candidate_id:{
        type: INTEGER(10),
        defaultValue: null,
      },
      candidate:{
        type: STRING(10),
        defaultValue: null,
      },
      post:{
        type: STRING(20),
        defaultValue: null,
      },
      team_id:{
        type: INTEGER(10),
        defaultValue: null,
      },
      team:{
        type: STRING(20),
        defaultValue: null,
      },
      interviewer_id:{
        type: INTEGER(10),
        defaultValue: null,
      },
      interviewer:{
        type: STRING(20),
        defaultValue: null,
      },
      principal_id:{
        type: INTEGER(10),
        defaultValue: null,
      },
      principal:{
        type: STRING(20),
        defaultValue: null,
      }, 
      status:{
        type: INTEGER(2),
        defaultValue: 0,
      },
      progress:{
        type: INTEGER(11),
        defaultValue: null,
      },
      resume_url:{
        type: STRING(100),
        defaultValue: null,
      },
      order_time:DATE,
      created_at: DATE,
      updated_at: DATE,
    })
    return Interview
}
