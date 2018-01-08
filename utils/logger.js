const path = require('path');
const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: path.join(__dirname, './../logs', '/GSITAE.log') }),
  ],
});

module.exports = logger;
