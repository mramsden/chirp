const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');
const IllegalInputError = require('./illegalInputError');
const IncorrectCredentialsError = require('./incorrectCredentialsError');
const logger = require('./logger');
const accountsRouter = require('./routes/accounts');
const adminRouter = require('./routes/admin');
const tokensRouter = require('./routes/tokens');

module.exports = ({ port = process.env.PORT || 3000 } = {}) => {
  const app = new Koa();
  const router = new Router();
  router.use('/accounts', accountsRouter.routes(), accountsRouter.allowedMethods());
  router.use('/tokens', tokensRouter.routes(), adminRouter.allowedMethods());
  router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods());

  app
    .use(cors())
    .use(bodyparser())
    .use(async (ctx, next) => {
      try {
        await next()
      } catch (e) {
        if (e instanceof IllegalInputError) {
          ctx.status = 400;
          ctx.body = e.toJSON();
        } else if (e instanceof IncorrectCredentialsError) {
          ctx.status = 400;
          ctx.body = e.toJSON();
        } else {
          logger.error(e, 'Unexpected error');
          if (process.env.NODE_ENV === 'production') {
            ctx.throw(500);
          } else {
            throw e;
          }
        }
      }
    })
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(port, () => {
    logger.info(`Server is running on 0.0.0.0:${port}`);
  });
};
