const Router = require('koa-router');
const { verifyAccount } = require('../accounts');

const router = new Router();

router.post('/', async ctx => {
  const username = ctx.request.body.username || '';
  const password = ctx.request.body.password || '';

  await verifyAccount(username, password);

  ctx.status = 200;
  ctx.body = {
    token: '0123456789abcdef',
  };
});

module.exports = router;
