const config = require('app-config');
const Express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const router = require('./router');
const response = require('./utils/responseHelper');
const connect = require('./utils/ddbb');

const debug = require('debug')('GSITAEAPI:server');

connect(config.mongodb.uri)
  .then(() => logger.info('Successfull connection'))
  .catch(err => logger.error(err));


const app = new Express();

app.use(compression());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/userapi', router);

app.use((err, req, res, next) => {
  let responseData;

  if (err.name === 'JsonSchemaValidation') {
    // Log the error however you please
    debug(err.message);
    logger.error(err.message);
    // logs "express-jsonschema: Invalid data found"

    // Set a bad request http response status or whatever you want
    res.status(400);

    // Format the response body however you want
    responseData = {
      statusText: 'Bad Request',
      jsonSchemaValidation: true,
      validations: err.validations, // All of your validation information
    };

    // Take into account the content type if your app serves various content types
    if (req.xhr || req.get('Content-Type') === 'application/json') {
      response(res, responseData, 400);
    } else {
      // If this is an html request then you should probably have
      // some type of Bad Request html template to respond with
      response(res, responseData, 400);
    }
  } else {
    // pass error to next error middleware handler
    next(err);
  }
});

module.exports = app;
