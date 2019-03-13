const Router = require('koa-router');
const { createAccount } = require('../accounts');

const router = new Router();

router.post('/', async ctx => {
  const username = ctx.request.body.username || '';
  const password = ctx.request.body.password || '';

  await createAccount(username, password);
  
  ctx.status = 201;
});

module.exports = router;
