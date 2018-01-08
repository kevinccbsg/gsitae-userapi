const response = require('../utils/responseHelper');
const User = require('../models/User');
const logger = require('./../utils/logger');

const debug = require('debug')('GSITAEAPI:userController');

module.exports.getUser = async (req, res) => {
  debug('getUser Endpoint');
  debug(req.headers);
  const userName = req.headers['x-consumer-username'] || null;
  if (!userName) {
    logger.error('[userController] No request header');
    return response(res, 'Wong request. No consumer username', 400);
  }
  try {
    const responseUser = await User.findOne({
      code: userName,
    });
    if (!responseUser) {
      const error = {
        status: 404,
        message: 'Not found register',
      };
      throw error;
    }
    return response(res, responseUser, 200);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error deleting User. Not Found');
      return response(res, err.message, 404);
    }
    debug(err);
    logger.error('[userController] Error deleting User');
    return response(res, err, 500);
  }
};
