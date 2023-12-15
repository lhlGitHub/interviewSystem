'use strict';
const Service = require('egg').Service;
class User extends Service {
    async save(data) {
      return this.ctx.model.User.create(data);
    }
    async findUser(data) {
      // const { username } = data;
      let res = await this.ctx.model.User.findOne({
        where: { ...data },
      });
      return res
    }
}

module.exports = User