import Express from 'express';
<% if (authentication === 'session') { %>
import session from 'express-session';
import cookieParser from 'cookie-parser';
<% } %>
<% if(cors) { %>
import cors from 'cors';
<% } %>
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import l from './logger';<% if (specification === 'openapi_3') { %>
import * as OpenApiValidator from 'express-openapi-validator';
import errorHandler from '../api/middlewares/error.handler'
<% } else { %>
import oas from './swagger';
<% } %>
<% if (database === 'mongo') { %>
import mongo from "./mongo";
<% } %>

const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
<% if (specification === 'openapi_3') { %>
    const apiSpec = path.join(__dirname, 'api.yml');
    const validateResponses = !!(
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    );
<% } %>
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb'}));
<% if (authentication === 'session') { %>
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 360000 }
    }));    
<% } %>
    app.use(Express.static(`${root}/public`));
<% if (specification === 'openapi_3') { %>
    app.use(process.env.OPENAPI_SPEC || '/spec', Express.static(apiSpec));
    app.use(
      OpenApiValidator.middleware({
        apiSpec,
        validateResponses,
        ignorePaths: /.*\/spec(\/|$)/,
      })
    );
<% } %>
<% if(cors) { %>
    app.use(cors());
<% } %>
  }

  router(routes) {
<% if (specification === 'openapi_3') { %>
    routes(app)
    app.use(errorHandler)
    return this;
<% } else { %>
    this.routes = routes;
    return this;
<% } %>
  }

  listen(port = process.env.PORT) {
    const welcome = p => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}}`
      );
<% if (specification === 'openapi_3') { %>
  <% if (database === 'mongo') { %>
    mongo().then(() => {
      l.info("Database Loaded!");
      http.createServer(app).listen(port, welcome(port));
    });
  <% } else { %>
    http.createServer(app).listen(port, welcome(port));
  <% } %>
<% } else { %>
    oas(app, this.routes)
      .then(() => {
<% if (database === 'mongo') { %>
        mongo().then(() => {
          l.info("Database Loaded!");
          http.createServer(app).listen(port, welcome(port));
        });
<% } else { %>
        http.createServer(app).listen(port, welcome(port));
<% } %>
      })
      .catch((e) => {
        l.error(e);
        exit(1);
      });
<% } %>
    return app;
  }
}
