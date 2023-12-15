
'use strict';
/*
* 简历表
*/
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const Resume = app.model.define('resume', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      name:{
        type: STRING(10),
        defaultValue: null,
      },
      expected_position:{
        type: STRING(10),
        defaultValue: null, 
      },
      email: {
      type: STRING(50),
      defaultValue: null,
      },
      mobile: {
        type: INTEGER(20),
        defaultValue: null,
      },
      age: {
        type: INTEGER(3),
        defaultValue: null,
    },
    education: {
        type: STRING(10),
        defaultValue: null,
    },
    major: {
        type: STRING(20),
        defaultValue: null,
    },
    city: {
        type: STRING(20),
        defaultValue: null,
     },
     status: {
        type: INTEGER(2),
        defaultValue: 0,
    },
    channel: {
        type: INTEGER(2),
        defaultValue: 0,
    },
    tags:{
        type: STRING(50),
        defaultValue: null,
    },
    file:{
        type: STRING(100),
        defaultValue: null,
    },
    under_team_id:{
      type: INTEGER(10),
        defaultValue: null,
    },
    under_team:{
      type: STRING(20),
      defaultValue: null,
  },

      created_at: DATE,
      updated_at: DATE,
    })
    return Resume
}
