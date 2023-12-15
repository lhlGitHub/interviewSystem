
'use strict';
/*
* 团队表
*/
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const Post = app.model.define('post', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      name:{
        type: STRING(10),
        defaultValue: null,
      },
      post_detail:{
        type: STRING(500),
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
      created_at: DATE,
      updated_at: DATE,
    })
    return Post
}
