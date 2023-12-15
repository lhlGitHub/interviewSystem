'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class TeamController extends Controller {
  async getTeamList() {
    const ctx = this.ctx;
    let teams = await ctx.model.Team.findAll();

    teams = Promise.all(
      teams.map(async (item) => {
        const users = await ctx.model.User.findAll({
          where: { team_id: item.id },
        });
        const resumes = await ctx.model.Resume.findAll({
          where: { under_team_id: item.id },
        });
        // console.log('users',users)
        // console.log('resumes',resumes)

        item.user_num = users.length;
        item.resume_num = resumes.length;

        return item;
      })
    );

    ctx.body = await teams;

    // console.log('teams', teams);
    // // console.log('resumes', resumes);
  }
  async create() {
    const ctx = this.ctx;
    const team = await ctx.service.team.findTeam({
      name: ctx.request.body.name,
    });
    if (team) {
      ctx.body = ctx.helper.res({
        code: 404,
        message: 'fail,团队已存在',
      });
      return;
    }
    const saveTeam = await ctx.service.team.save(ctx.request.body);
    if (!saveTeam) return;
    ctx.body = ctx.helper.res();
  }

  async search() {
    const ctx = this.ctx;
    // // console.log('ctx.params.ids', ctx.query.id);
    const id = ctx.query.id;
    const res = await ctx.model.Team.findByPk(toInt(id));
    ctx.body = res;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const team = await ctx.model.Team.findByPk(id);
    // console.log('team', team);
    if (!team) {
      ctx.status = 404;
      return;
    }
    // const { name, age } = ctx.request.body;
    await team.update({ ...ctx.request.body });

    ctx.body = ctx.helper.res();
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    // console.log('destroy id', id);
    const team = await ctx.model.Team.findByPk(id);
    if (!team) {
      ctx.status = 200;
      ctx.body = ctx.helper.res({
        code: 404,
        message: 'fail，团队不存在或已被删除',
      });
      return;
    }

    await team.destroy();
    ctx.body = ctx.helper.res();
  }
}

module.exports = TeamController;
