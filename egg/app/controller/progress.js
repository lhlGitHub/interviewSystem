'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ProgressController extends Controller {
  async getProgressList() {
    const ctx = this.ctx;
    const { interview_id } = ctx.query;
    ctx.body = await ctx.model.Progress.findAll({ where: { interview_id } });
  }
  async create() {
    const ctx = this.ctx;
    let data = ctx.request.body;
    let progress = 0;
    let is_end = data.mark === 0 ? true : false;

    const interview = await ctx.model.Interview.findByPk(
      // 获取当前进程
      toInt(data.interview_id)
    );
    progress = interview.progress;
    // console.log('interview', interview);

    if (interview.interviewer_id === interview.principal_id) {
      // hr 提交生成面试官新记录

      // console.log('progress1', progress);
      const res = await ctx.service.progress.save({
        ...data,
        progress_status: progress + 1,
      });
      interview.update({
        //更新进程
        progress: progress + 1,
        interviewer_id: data.interviewer_id,
        interviewer: data.interviewer,
      });
    } else {
      // 面试官提交更新自己的记录同时新增一条hr记录
      let progressRes = await ctx.service.progress.findProgress({
        interview_id: data.interview_id,
        progress_status: progress,
      });

      progressRes.update(data); // 更新评论

      // 如果面试不通过
      if (is_end) {
        const res = await ctx.service.progress.save({
          interview_id: interview.id,
          is_end: 1,
          end_reason: 4,
          progress_status: 8,
        });
        interview.update({
          //更新进程
          interviewer_id: null,
          interviewer: null,
          status: 4,
          progress: 8,
        });
        ctx.body = ctx.helper.res();

        return;
      }
      const res = await ctx.service.progress.save({
        // 新增hr记录
        interview_id: interview.id,
        interviewer_id: interview.principal_id,
        interviewer: interview.principal,
        progress_status: progress + 1,
      });
      // console.log('新增hr res', res);

      interview.update({
        //更新进程
        progress: progress + 1,
        interviewer_id: interview.principal_id,
        interviewer: interview.principal,
        status: progress > 0 ? 1 : 0,
      });
      // console.log('interview', interview);
    }

    ctx.body = ctx.helper.res();
  }

  async search() {
    const ctx = this.ctx;
    // // console.log('ctx.params.ids', ctx.query.id);
    const res = await ctx.model.Progress.findByPk(toInt(ctx.query.id));
    // console.log('search', res);
    ctx.body = res;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const progress = await ctx.model.Progress.findByPk(id);
    // console.log('progress', progress);
    if (!progress) {
      ctx.status = 404;
      return;
    }
    // const { name, age } = ctx.request.body;
    await progress.update({ ...ctx.request.body });

    ctx.body = ctx.helper.res();
  }
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    // console.log('destroy id', id);
    const progress = await ctx.model.Progress.findByPk(id);
    if (!progress) {
      ctx.body = ctx.helper.res({
        code: 404,
        message: 'fail，面试不存在或已被删除',
      });
      ctx.status = 200;

      return;
    }

    await progress.destroy();
    ctx.body = ctx.helper.res();
  }
}

module.exports = ProgressController;
