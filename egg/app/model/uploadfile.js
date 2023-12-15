
'use strict';
/*
* 团队表
*/
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const UploadFile = app.model.define('uploadfile', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      filename:{
        type: STRING(50),
        defaultValue: null,
      },
      encoding:{
        type: STRING(20),
        defaultValue: null,
      },
      mime:{
        type: STRING(50),
        defaultValue: null,
      },
      fileurl:{
        type: STRING(500),
        defaultValue: null,
      },
      created_at: DATE,
      updated_at: DATE,
    })
    return UploadFile
}
