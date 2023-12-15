'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ResumeController extends Controller {
  async getResumeList() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Resume.findAll();
  }
  async create() {
    const ctx = this.ctx;
    const { team, team_id } = ctx.locals.userInfo;
    await ctx.service.resume.save({
      under_team: team,
      under_team_id: team_id,
      ...ctx.request.body,
    });
    ctx.body = ctx.helper.res();
  }

  async search() {
    const ctx = this.ctx;
    // console.log('ctx.params.ids', ctx.query.id);
    ctx.body = await ctx.model.Resume.findByPk(toInt(ctx.query.id));
  }

  async approve() {
    const ctx = this.ctx;
    const { role } = ctx.locals.userInfo;
    // console.log('role', role);
    if (!(role === 'admin' || role === 'superAdmin')) {
      ctx.body = ctx.helper.res({ code: 405, message: '您无权限审批' });

      return;
    }

    // const ctx = this.ctx;
    const { id, ...data } = ctx.request.body;

    const resume = await ctx.model.Resume.findByPk(toInt(id));

    if (!resume) {
      ctx.status = 404;

      ctx.body = ctx.helper.res({
        code: 404,
        message: '简历不存在',
      });
      return;
    }

    if (resume.status !== 0) {
      // // console.log(2222222222, ctx);
      ctx.status = 200;
      ctx.body = ctx.helper.res({
        code: 400,
        message: '已审批',
      });
      return;
    }

    await resume.update(data);

    ctx.body = ctx.helper.res();
  }
  async update() {
    const ctx = this.ctx;
    const { id, ...data } = ctx.request.body;
    const resume = await ctx.model.Resume.findByPk(toInt(id));
    if (!resume) {
      ctx.status = 404;
      return;
    }
    await resume.update(data);

    ctx.body = ctx.helper.res();
  }
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    // console.log('destroy id', id);
    const resume = await ctx.model.Resume.findByPk(id);
    if (!resume) {
      // ctx.status = 200;
      ctx.body = ctx.helper.res({
        code: 404,
        message: 'fail，简历不存在或已被删除',
      });

      return;
    }

    await resume.destroy();
    ctx.body = ctx.helper.res();
  }

  async upload() {
    const ctx = this.ctx;
    // const stream = await ctx.getFileStream();
    const parts = ctx.multipart();

    let part;
    while ((part = await parts()) != null) {
      if (part.length) {
        // console.log('field: ' + part[0]);
        // console.log('value: ' + part[1]);
      } else {
        if (!part.filename) {
          continue;
        }
        // console.log('field: ' + part.fieldname);
        // console.log('filename: ' + part.filename);
        // console.log('encoding: ' + part.encoding);
        // console.log('mime: ' + part.mime);

        const writePath = path.resolve(
          './files/',
          `${new Date().getTime() + part.filename}`
        );
        // console.log(writePath);
        if (!fs.existsSync(writePath)) {
          fs.writeFileSync(writePath, '');
        }
        const writeStream = fs.createWriteStream(writePath);
        await part.pipe(writeStream);
        ctx.status = 200;
        ctx.body = ctx.helper.res({ data: writePath });
      }
    }
  }
}

module.exports = ResumeController;
