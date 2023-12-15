'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class InterviewController extends Controller {
  async getInterviewList() {
    const ctx = this.ctx;
    const data = await ctx.model.Interview.findAll();
    console.log('data',data)
    ctx.body = ctx.helper.res({ data });
  }
  async closeInterview() {
    const ctx = this.ctx;
    const data = ctx.request.body;
    const interview = await ctx.model.Interview.findByPk(
      // 获取当前进程
      toInt(data.interview_id)
    );
    const res = await ctx.service.progress.save({
      is_end: 1,
      ...data,
      progress_status: 8,
    });
    interview.update({
      //更新进程
      interviewer_id: null,
      interviewer: null,
      status: data.end_reason,
      progress: 8,
    });
    // console.log('结束 interview',interview)

    ctx.body = ctx.helper.res();
  }
  async create() {
    const ctx = this.ctx;
    const {
      resume_id,
      interviewer_id,
      interviewer,
      ...data
    } = ctx.request.body;

    const resume = await ctx.model.Resume.findByPk(toInt(resume_id));
    resume.update({
      status: 3,
    });

    const {
      // candidate_id,
      name,
      under_team_id,
      under_team,
      expected_position,
      file,
    } = resume;

    const { id } = await ctx.service.interview.save({
      principal_id: interviewer_id,
      principal: interviewer,
      candidate: name,
      team_id: under_team_id,
      team: under_team,
      post: expected_position,
      resume_url: file,
      interviewer_id,
      interviewer,
      progress: 0,
      ...data,
    });
    // console.log('面试 interviewer_id', interviewer_id, interviewer);

    await ctx.service.progress.save({
      interview_id: id,
      principal_id: interviewer_id,
      principal: interviewer,
      interviewer_id,
      interviewer,
      progress_status: 0,
    });

    ctx.body = ctx.helper.res();
  }

  async search() {
    const ctx = this.ctx;
    // // console.log('ctx.params.ids', ctx.query.id);
    const data = await ctx.model.Interview.findByPk(toInt(ctx.query.id));
    // console.log('search', res);
    ctx.body = ctx.helper.res({ data });
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const interview = await ctx.model.Interview.findByPk(id);
    // console.log('interview', interview);
    if (!interview) {
      ctx.status = 404;
      return;
    }
    // const { name, age } = ctx.request.body;
    await interview.update({ ...ctx.request.body });

    ctx.body = ctx.helper.res();
  }
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    // console.log('destroy id', id);
    const interview = await ctx.model.Interview.findByPk(id);
    if (!interview) {
      ctx.body = ctx.helper.res({
        code: 404,
        message: 'fail，面试不存在或已被删除',
      });

      return;
    }

    await interview.destroy();
    ctx.status = 200;
    ctx.body = ctx.helper.res();
  }
}

module.exports = InterviewController;
