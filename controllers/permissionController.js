const _ = require('lodash');
const response = require('../utils/responseHelper');
const Permission = require('../models/Permission');
const logger = require('./../utils/logger');

const debug = require('debug')('GSITAEAPI:permissionController');

const permissionFields = ['name', 'description', 'redirect_uri'];

const permissionList = async (req, res) => {
  debug('[permissionController] permissionList');
  try {
    const mongoResponse = await Permission.find({});
    logger.info('[permissionController] permissionList information');
    return response(res, { permissions: mongoResponse }, 200);
  } catch (err) {
    debug('[permissionController] Error');
    debug(err);
    logger.error('[permissionController] Error permissionList information');
    return response(res, err, 500);
  }
};

const createPermission = async (req, res) => {
  debug('[permissionController] createPermission');
  try {
    const payload = _.pick(req.body, permissionFields);
    const newPermission = new Permission(payload);
    await newPermission.save();
    return response(res, payload, 201);
  } catch (err) {
    debug('[permissionController] Error');
    debug(err.code);
    if (err.code === 11000) {
      return response(res, 'Conflict createPermission Already Exists', 409);
    }
    debug(err);
    logger.error('[permissionController] Error createPermission list information');
    return response(res, err, 500);
  }
};

const updatePermission = async (req, res) => {
  debug('[permissionController] updatePermission');
  const { code } = req.params;
  try {
    const responsePermission = await Permission.findOne({ name: code });
    if (!responsePermission) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
    const payload = _.pick(req.body, permissionFields);
    await Permission.update({ name: code }, payload);
    return response(res, payload, 200);
  } catch (err) {
    if (err.status === 404) {
      logger.error('[permissionController] Error deleting Permission. Not Found');
      return response(res, err.message, 404);
    }
    debug('[permissionController] Error');
    debug(err);
    logger.error('[permissionController] Error Permission list information');
    return response(res, err, 500);
  }
};

const deletePermission = async (req, res) => {
  debug('[permissionController] deletePermission');
  const { code } = req.params;
  if (!_.isString(code)) {
    debug('[permissionController] Error');
    logger.error('[permissionController] Error deleting Permission. Bad request. identifier must be String');
    return response(res, 'Bad Request', 400);
  }
  try {
    const responsePermission = await Permission.findOne({ name: code });
    if (!responsePermission) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
    const responseRemove = await Permission.remove({ name: code });
    if (responseRemove.nRemoved === 0) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
    return response(res, 'Permission removed', 204);
  } catch (err) {
    debug('[permissionController] Error');
    if (err.status === 404) {
      logger.error('[permissionController] Error deleting Permission. Not Found');
      return response(res, err.message, 404);
    }
    debug(err);
    logger.error('[permissionController] Error deleting Permission');
    return response(res, err, 500);
  }
};

const getPermission = async (req, res) => {
  debug('[permissionController] getPermission');
  const { code } = req.params;
  if (!_.isString(code)) {
    debug('[permissionController] Error');
    logger.error('[permissionController] Error getting Permission. Bad request. identifier must be Number');
    return response(res, 'Bad Request', 400);
  }
  try {
    const responsePermission = await Permission.findOne({ name: code });
    if (!responsePermission) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
    return response(res, responsePermission, 200);
  } catch (err) {
    debug('[permissionController] Error');
    if (err.status === 404) {
      logger.error('[permissionController] Error deleting User. Not Found');
      return response(res, err.message, 404);
    }
    debug(err);
    logger.error('[permissionController] Error deleting User');
    return response(res, err, 500);
  }
};

module.exports = {
  getPermission,
  deletePermission,
  createPermission,
  permissionList,
  updatePermission,
};
