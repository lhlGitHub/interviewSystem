'use strict';
const jwt = require('jsonwebtoken');
// const resBody = require('../lib/response_status');
// // console.log('resBody',resBody)
module.exports = () => {
  return async function auth(ctx, next) {
    try {
      const token = ctx.header.authorization;
      const secretOrPrivateKey = 'interview';
      if (!token) {
        ctx.body = ctx.helper.res(401, 'token 无效');
        return;
      }
      const { username } = jwt.verify(token, secretOrPrivateKey);
      // console.log('jwt username', username);
      const user = await ctx.service.user.findUser({ username });
      !ctx.locals.userInfo && (ctx.locals.userInfo = user);
      if (!user) {
        // ctx.status = 200;
        ctx.body = ctx.helper.res(404, '用户不存在或已被删除');
        return;
      }
      await next();
    } catch (error) {
      // console.log('jwt', error);
      // ctx.status = 200;
      ctx.body = ctx.helper.res(401, 'token 过期');
    }
  };
};
