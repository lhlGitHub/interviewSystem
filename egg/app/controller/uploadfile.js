'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UploadFileController extends Controller {
  async getUploadFileList() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.UploadFile.findAll();
  }
  async upload() {
    const ctx = this.ctx;
    const parts = ctx.multipart();
    // console.log('ctx.model.UploadFile',ctx.model)
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
        const { filename, encoding, mime } = part;
        const writePath = path.resolve(
          './files/',
          `${new Date().getTime() + filename}`
        );
        // console.log(writePath);
        if (!fs.existsSync(writePath)) {
          fs.writeFileSync(writePath, '');
        }
        const writeStream = fs.createWriteStream(writePath);
        await part.pipe(writeStream);

        await ctx.model.UploadFile.create({
          filename,
          encoding,
          mime,
          fileurl: writePath,
        });
        ctx.body = ctx.helper.res();
      }
    }
  }
  async create() {
    const ctx = this.ctx;
    // // console.log('ctx.request.body', ctx.request.body);
    await ctx.model.UploadFile.create(ctx.request.body);
    ctx.body = ctx.helper.res();
  }

  async search() {
    const ctx = this.ctx;
    // // console.log('ctx.params.ids', ctx.query.id);
    const res = await ctx.model.UploadFile.findByPk(toInt(ctx.query.id));
    // console.log('search', res);
    ctx.body = res;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const post = await ctx.model.UploadFile.findByPk(id);
    // console.log('post', post);
    if (!post) {
      ctx.status = 404;
      return;
    }
    // const { name, age } = ctx.request.body;
    await post.update({ ...ctx.request.body });

    ctx.body = ctx.helper.res();
  }
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    // console.log('destroy id', id);
    const post = await ctx.model.UploadFile.findByPk(id);
    if (!post) {
      ctx.body = ctx.helper.res({
        code: 404,
        message: 'fail，职位不存在或已被删除',
      });

      return;
    }

    await post.destroy();
    ctx.body = ctx.helper.res();
  }
}

module.exports = UploadFileController;
