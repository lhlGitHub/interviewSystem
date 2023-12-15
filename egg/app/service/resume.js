'use strict';
const Service = require('egg').Service;
class Resume extends Service {
    async save(data) {
      return this.ctx.model.Resume.create(data);
    }
    async findResume(data) {
      // const { id } = data;
      let res = await this.ctx.model.Resume.findOne({
        where: { ...data },
      });
      return res
    }
}

module.exports = Resume