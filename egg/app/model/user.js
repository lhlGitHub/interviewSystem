
'use strict';
/*
* 用户表
* role, 'superAdmin'->超管,'admin'->管理员，'interviewer'->面试官,'user'->用户
*/
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const User = app.model.define('user', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      name:{
        type: STRING(50),
        defaultValue: null,
      },
      username: {
        type: STRING(50),
        defaultValue: null,
      },
      password: {
        type: STRING(200),
        defaultValue: null,
      },
      role: {
        type: STRING(50),
        defaultValue: 'user',
      },
      team_id: {
        type: INTEGER(20),
        defaultValue: null,
      },
      team: {
        type: STRING(50),
        defaultValue: null,
      },
      email: {
      type: STRING(100),
      defaultValue: null,
      },
      mobile: {
        type: INTEGER(20),
        defaultValue: null,
      },
      created_at: DATE,
      updated_at: DATE,
    })
    return User
}
