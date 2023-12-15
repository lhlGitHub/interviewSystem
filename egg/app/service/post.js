'use strict';
const Service = require('egg').Service;
class Post extends Service {
    async save(data) {
      return this.ctx.model.Post.create(data);
    }
    async findPost(data) {
      // const { id } = data;
      let res = await this.ctx.model.Post.findOne({
        where: { ...data },
      });
      return res
    }
}

module.exports = Post