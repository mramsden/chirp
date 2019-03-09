const Router = require('koa-router');

const admin = new Router();

admin.get('/healthz', async ctx => {
  ctx.body = {
    status: 'ok'
  };
});

module.exports = admin;
