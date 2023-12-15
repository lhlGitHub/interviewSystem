module.exports = (options, app) => {
  return async function (ctx, next) {
    try {
      await next();
    } catch (error) {
      app.emit('error', error, this);
      const status = error.status || 500;
      const err =
        status === 500 && app.config.env === 'prod'
          ? '网络异常'
          : error.message;
      ctx.body = {
        code: status,
        message: err,
      };
    }
  };
};
