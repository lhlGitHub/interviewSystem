'use strict';
const Service = require('egg').Service;
class Interview extends Service {
    async save(data) {
      return this.ctx.model.Interview.create(data);
    }
    async findInterview(data) {
      // const { id } = data;
      let res = await this.ctx.model.Interview.findOne({
        where: { ...data },
      });
      return res
    }
}

module.exports = Interview