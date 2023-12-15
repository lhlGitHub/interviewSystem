
'use strict';
/*
* 团队表
*/
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const Team = app.model.define('team', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      name:{
        type: STRING(10),
        defaultValue: null,
      },
      user_num:{
        type: INTEGER(10),
        defaultValue: null,
      },
      resume_num:{
        type: INTEGER(10),
        defaultValue: null,
      },
      administrator:{
        type: STRING(10),
        defaultValue: null,
      },
      administrator_id:{
        type: INTEGER(20),
        defaultValue: null,
      },
      created_at: DATE,
      updated_at: DATE,
    })
    return Team
}
