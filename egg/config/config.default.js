/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'interview',
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*'],
  };
  config.cors = {
    // origin: 'http://127.0.0.1:3000',
    // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599984076152_9056';

  // add your middleware config here
  config.middleware = ['auth','errorHandler'];
  config.auth = {
    enable: true, // 是否开启该中间件，不写默认开启
    // match: ['/user/userInfo'], // 只匹配指定路由，反之如果只忽略指定路由，可以用ignore
    ignore: ['/user/login','/user/register'] // 不要与match一起使用，避免冲突
  }
  exports.multipart = {
    // will append to whilelist
    fileExtensions: [
      '.doc',
      '.docx',
      '.ppt'
    ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
