const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const session = require('./middleware/session');
const parsers = require('./middleware/parsers');
const errorHandler = require('./middleware/errorHandler');
const apolloServer = require("./graphql");

app.use(logger);

app.use(session);

app.use(parsers);

apolloServer.applyMiddleware({app, path: '/graphql', cors: false});

app.use(errorHandler);

module.exports = app;
