'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const EXPIRES = 60 * 15 * 100;
const { Op } = Sequelize;
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async getUserList() {
    const ctx = this.ctx;
    let { name, team_id, current, pageSize } = ctx.query;
    // // console.log(' ctx.query', ctx.query);
    current = toInt(current);
    pageSize = toInt(pageSize);
    let params = {};
    team_id && (params.team_id = team_id);
    name && (params.name = { [Op.like]: '%' + name + '%' });
    // // console.log('params ', params);

    let options = {};

    if (name || team_id) {
      options = {
        where: params,
        offset: (current - 1) * pageSize,
        limit: pageSize,
      };
    } else {
      options = {
        offset: (current - 1) * pageSize,
        limit: pageSize,
      };
    }

    let total = await ctx.model.User.findAndCountAll(options);
    ctx.body = ctx.helper.res({
      data: total,
      // current,
      // pageSize,
    });
    // // console.log('ctx.body getUserList', ctx.body);
  }
  // 登陆
  async login() {
    // console.log('app login');
    try {
      const { ctx } = this;
      const { password } = ctx.request.body;
      const user = await ctx.service.user.findUser(ctx.request.body);
      if (!user) {
        ctx.body = ctx.helper.res({
          code: 404,
          message: '该用户不存在',
        });
        return;
      }
      if (password != user.password) {
        ctx.body = ctx.helper.res({
          code: 402,
          message: '密码不正确，请重新输入',
        });
        return;
      }
      // // console.log('login user', user);
      const secretOrPrivateKey = 'interview';
      const token = jwt.sign(
        { uid: user.id, email: user.email, username: user.username },
        secretOrPrivateKey,
        { expiresIn: EXPIRES }
      );
      ctx.body = ctx.helper.res({
        data: {
          token,
          user: user.dataValues,
        },
      });
    } catch (error) {
      // console.log('err', error);
    }
  }
  async show() {
    const ctx = this.ctx;
    // console.log('ctx.params.ids', ctx.query.id);
    ctx.body = await ctx.model.User.findByPk(toInt(ctx.query.id));
  }
  async search(params, attributes) {
    const list = await this.ctx.model.User.findAll({
      where: { ...params },
      attributes,
    });
    return list;
  }
  async searchRole() {
    const ctx = this.ctx;
    // ctx.status = 200;

    ctx.body = await this.search(ctx.query, ['id', 'name', 'role']);
  }
  // async searchByName() {
  //   const ctx = this.ctx;
  //   let params =  {name: {
  //     // 模糊查询
  //     [Op.like]:'%' + name + '%'
  //   }}
  //   ctx.status = 200;
  //   ctx.body = await this.search(params);
  // }

  async getUserInfo(ctx, next) {
    // // console.log('this.ctx.locals', JSON.stringify(this.ctx.locals));
    const userInfo = this.ctx.locals.userInfo;
    // // console.log('username', username);
    // ctx.status = 200;
    ctx.body = userInfo;
  }
  async create() {
    // let ctx = this.ctx;
    // ctx.body={name:13}
    // return 
    const ctx = this.ctx;
    const { username, password, ...data } = ctx.request.body;
    const user = await ctx.service.user.findUser({ username });
    // console.log('create user', user);
    if (!user) {
      await ctx.service.user.save({ username, password, ...data });
      // ctx.status = 200;
      ctx.body = ctx.helper.res();
    } else {
      // ctx.status = 200;
      console.log(
        'res111',
        ctx.helper.res({ code: 401, message: 'fail,用户名已存在' })
      );
      ctx.body = ctx.helper.res({ code: 401, message: 'fail,用户名已存在' });
      console.log('ctx.body ', ctx.body);
      // ctx.body = {
      //   code: 401,
      //   message: 'fail,用户名已存在',
      //   data: null,
      // };
    }
  }

  async update() {
    const ctx = this.ctx;
    const { id, ...data } = ctx.request.body;
    const user = await ctx.model.User.findByPk(toInt(id));

    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.update(data);

    ctx.body = ctx.helper.res();
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    // console.log('destroy id', id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.body = ctx.helper.res({
        code: 404,
        message: 'fail，用户不存在或已被删除',
      });
      return;
    }

    await user.destroy();
    ctx.body = ctx.helper.res();
  }
}

module.exports = UserController;
