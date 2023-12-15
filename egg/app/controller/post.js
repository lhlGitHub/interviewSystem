'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class PostController extends Controller {
  async getPostList() {
    const ctx = this.ctx;
    const data = await ctx.model.Post.findAll();
    ctx.body = ctx.helper.res({ data });
  }
  async create() {
    const ctx = this.ctx;
    // // console.log('ctx.request.body', ctx.request.body);
    await ctx.service.post.save(ctx.request.body);
    ctx.body = ctx.helper.res();
  }

  async search() {
    const ctx = this.ctx;
    // // console.log('ctx.params.ids', ctx.query.id);
    const res = await ctx.model.Post.findByPk(toInt(ctx.query.id));
    // console.log('search', res);
    ctx.body = res;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const post = await ctx.model.Post.findByPk(id);
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
    const post = await ctx.model.Post.findByPk(id);
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

module.exports = PostController;
