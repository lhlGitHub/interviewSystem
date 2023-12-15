'use strict';
const Service = require('egg').Service;
class Progress extends Service {
    async save(data) {
      return this.ctx.model.Progress.create(data);
    }
    async findProgress(data) {
      // const { id } = data;
      let res = await this.ctx.model.Progress.findOne({
        where: { ...data },
      });
      return res
    }
}

module.exports = Progress