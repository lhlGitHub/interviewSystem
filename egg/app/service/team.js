'use strict';
const Service = require('egg').Service;
class Team extends Service {
    async save(data) {
      return this.ctx.model.Team.create(data);
    }
    async findTeam(data) {
      // const { id } = data;
      let res = await this.ctx.model.Team.findOne({
        where: { ...data},
      });
      return res
    }
}

module.exports = Team