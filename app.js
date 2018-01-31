const config = require('app-config');
const Express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const router = require('./router');
const connect = require('./utils/ddbb');

connect(config.mongodb.uri)
  .then(() => logger.info('Successfull connection'))
  .catch(err => logger.error(err));


const app = new Express();

app.use(compression());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/userapi', router);

module.exports = app;
