/* eslint-disable no-sync */
const fs = require('fs');

const Koa = require('koa');
const CSRF = require('koa-csrf');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const session = require('koa-session-jwt');
require('./auth');

const mongoose = require('mongoose');


const createServer = (dependencies) => {
  const router = new Router()

  router.post('/login', ctx => {
    return passport.authenticate('local', {
      successRedirect: '/private-zone',
      failureRedirect: '/login-failed'
    })(ctx);
  });

  router.get('/login', ctx => {
    ctx.type = 'html';

    ctx.body = fs
      .readFileSync('views/login.html', 'utf8')
      .replace('{csrfToken}', ctx.csrf);
  });

  router.get('/logout', ctx => {
    if(ctx.isAuthenticated()) ctx.logout();

    ctx.body = fs
      .readFileSync('views/logout.html', 'utf8');
  });

  router.get('/login-failed', ctx => {
    ctx.type = 'html';

    ctx.body = fs
      .readFileSync('views/login-failed.html', 'utf8');
  });

  router.get('/private-zone', ctx => {
    if (ctx.isUnauthenticated()) {
      return ctx.throw(401, 'Unauthorized');
    }

    ctx.type = 'html';

    ctx.body = fs
      .readFileSync('views/private-zone.html', 'utf8')
      .replace('{userName}', ctx.state.user.username);
  });

  const app = new Koa();

  app.use(bodyParser());

	app.use(session.default(dependencies.env.SESSION_SECRET));

  app.use(new CSRF({
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
    disableQuery: false
  }));

  app.use(passport.initialize());

  app.use(passport.session());

  app.use(router.routes());

  mongoose.connect(dependencies.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return app.listen(dependencies.env.PORT).on('close', () => {
    mongoose.disconnect();
  });
};

exports.createServer = createServer;
