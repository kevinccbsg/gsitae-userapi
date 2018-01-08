const logger = require('./utils/logger');

const debug = require('debug')('GSITAEAPI:userController');

module.exports.getUser = (req, res) => {
  debug('getUser Endpoint');
  debug(req.headers);
  res.send('ey')
};
