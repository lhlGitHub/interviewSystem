'use strict';
/*
 * 面试进度表
 */
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Progress = app.model.define('progress', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    interview_id: {
      type: INTEGER(10),
      defaultValue: null,
    },
    sort_num: {
      type: INTEGER(2),
      defaultValue: null,
    },
    mark: {
      type: INTEGER(2),
      defaultValue: null,
    },
    rate: {
      type: INTEGER(5),
      defaultValue: null,
    },
    progress_status: {
      type: INTEGER(2),
      defaultValue: null,
    },
    progress_title: {
      type: STRING(10),
      defaultValue: null,
    },

    comment: {
      type: STRING(500),
      defaultValue: null,
    },
    interviewer_id: {
      type: INTEGER(11),
      defaultValue: null,
    },
    interviewer: {
      type: STRING(10),
      defaultValue: null,
    },
    principal: {
      type: STRING(10),
      defaultValue: null,
    },
    principal_id: {
      type: INTEGER(11),
      defaultValue: null,
    },
    is_end: {
      type: INTEGER(2),
      defaultValue: null,
    },
    end_reason: {
      type: INTEGER(2),
      defaultValue: null,
    },
    interview_time: DATE,
    created_at: DATE,
    updated_at: DATE,
  });
  return Progress;
};
