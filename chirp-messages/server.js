const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');
const logger = require('./logger');
const adminRouter = require('./routes/admin');
const messagesRouter = require('./routes/messages');

module.exports = ({ port = process.env.PORT || 3000 } = {}) => {  
  const app = new Koa();
  const router = new Router();
  router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());
  router.use('/messages', messagesRouter.routes(), messagesRouter.allowedMethods());

  app
    .use(bodyparser())
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(port, () => {
    logger.info(`Server is running on 0.0.0.0:${port}`);
  });
};
