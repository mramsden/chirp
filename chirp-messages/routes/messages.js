const Router = require('koa-router');
const { getMessages, createMessage } = require('../messages');

const router = new Router();

router.get('/', async ctx => {
  const { opf } = ctx.request.query;
  if (opf) {
    ctx.body = await getMessages(opf.split(','));
  } else {
    ctx.body = await getMessages();
  }
});

router.post('/', async ctx => {
  const { body } = ctx.request.body;
  await createMessage(body);
  ctx.status = 201;
});

module.exports = router;
