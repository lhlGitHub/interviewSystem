'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, 233333';
  }
  async user() {
    // // console.log(111111);
    const { ctx } = this;
    ctx.body = 'hi, human';
  }
}

module.exports = HomeController;
