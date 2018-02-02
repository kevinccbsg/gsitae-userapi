const _ = require('lodash');
const validator = require('validator');
const response = require('../utils/responseHelper');
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const logger = require('./../utils/logger');

const debug = require('debug')('GSITAEAPI:userController');

const userFields = [
  'name',
  'surname',
  'code',
  'email',
  'grade',
  'faculty',
];

const userList = async (req, res) => {
  debug('[userController] userList');
  try {
    const mongoResponse = await User.find({});
    logger.info('[userController] User list information');
    return response(res, { users: mongoResponse }, 200);
  } catch (err) {
    debug('[userController] Error');
    debug(err);
    logger.error('[userController] Error User list information');
    return response(res, err, 500);
  }
};

const createUser = async (req, res) => {
  debug('[userController] createUser');
  try {
    const payload = _.pick(req.body, userFields);
    if (!validator.isEmail(payload.email)) {
      return response(res, 'Bad Request', 400);
    }
    const newUser = new User(payload);
    await newUser.save();
    return response(res, payload, 201);
  } catch (err) {
    debug('[userController] Error');
    debug(err.code);
    if (err.code === 11000) {
      return response(res, 'Conflict User Already Exists', 409);
    }
    debug(err);
    logger.error('[userController] Error User list information');
    return response(res, err, 500);
  }
};

const deleteUser = async (req, res) => {
  debug('[userController] deleteUser');
  const { code } = req.params;
  if (_.isString(code)) {
    debug('[userController] Error');
    logger.error('[userController] Error deleting User. Bad request. identifier must be String');
    return response(res, 'Bad Request', 400);
  }
  try {
    const responseRemove = await User.remove({ code });
    if (responseRemove.nRemoved === 0) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
    return response(res, 'User removed', 204);
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

const getUser = async (req, res) => {
  debug('[userController] getUser');
  const { code } = req.params;
  if (_.isString(code)) {
    debug('[userController] Error');
    logger.error('[userController] Error getting User. Bad request. identifier must be Number');
    return response(res, 'Bad Request', 400);
  }
  try {
    const responseUser = await User.findOne({ code });
    if (!responseUser) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
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

const addRolePermission = async (req, res) => {
  debug('[userController] addRolePermission');
  const { code } = req.params;
  const property = (req.originalUrl.indexOf('role') !== -1) ? 'roles' : 'permissions';
  if (_.isString(code)) {
    debug('[userController] Error');
    logger.error('[userController] Error adding Role User. Bad request. identifier must be Number');
    return response(res, 'Bad Request', 400);
  }
  try {
    const responseUser = await User.update({ code }, {
      $push: {
        [property]: req.body,
      },
    });
    if (responseUser.nModified === 0) {
      const error = {
        status: 404,
        message: 'Not found register to update',
      };
      throw error;
    }
    return response(res, `Updating ${property}`, 200);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error updating User. Not Found');
      return response(res, err.message, 404);
    }
    debug(err);
    logger.error('[userController] Error updating User');
    return response(res, err, 500);
  }
};

const removeRolePermission = async (req, res) => {
  debug('[userController] removeRolePermission');
  const { code } = req.params;
  const property = (req.originalUrl.indexOf('role') !== -1) ? 'roles' : 'permissions';
  if (_.isString(code)) {
    debug('[userController] Error');
    logger.error(`[userController] Error adding ${property} User. Bad request. identifier must be Number`);
    return response(res, 'Bad Request', 400);
  }
  try {
    const responseUser = await User.update({ code }, {
      $pull: {
        [property]: req.body,
      },
    });
    if (responseUser.nModified === 0) {
      const error = {
        status: 404,
        message: 'Not found register to update',
      };
      throw error;
    }
    return response(res, `Removed ${property}`, 204);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error updating User. Not Found');
      return response(res, err.message, 404);
    }
    debug(err);
    logger.error('[userController] Error updating User');
    return response(res, err, 500);
  }
};

const getRolePermissions = async (req, res) => {
  debug('[userController] getRolePermissions');
  try {
    const mongoResponse = await Promise.all([
      Permission.find({}),
      Role.find({}),
    ]);
    logger.info('[userController] User list information');
    return response(res, {
      roles: mongoResponse[1],
      permissions: mongoResponse[0],
    }, 200);
  } catch (err) {
    debug('[userController] Error');
    debug(err);
    logger.error('[userController] Error User list information');
    return response(res, err, 500);
  }
};

module.exports = {
  removeRolePermission,
  addRolePermission,
  getUser,
  deleteUser,
  createUser,
  userList,
  getRolePermissions,
};
