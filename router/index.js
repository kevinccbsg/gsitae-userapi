const Express = require('express');
const { validate } = require('express-jsonschema');
const {
  userList,
  createUser,
  getUser,
  removeRolePermission,
  addRolePermission,
  deleteUser,
  updateUser,
  getRolePermissions,
} = require('./../controllers/userController');
const {
  createPermission,
  updatePermission,
  deletePermission,
  getPermission,
  permissionList,
} = require('../controllers/permissionController');
const {
  userSchema,
  updateUserSchema,
} = require('./schemas');

const router = Express.Router();

router.get('/users', userList);
router.get('/rolepermission', getRolePermissions);
router.post('/user', validate({ body: userSchema }), createUser);
router.post('/user/:code/role', addRolePermission);
router.post('/user/:code/permission', addRolePermission);
router.delete('/user/:code/role', removeRolePermission);
router.delete('/user/:code/permission', removeRolePermission);
router.delete('/user/:code', deleteUser);
router.get('/user/:code', getUser);
router.patch('/user/:code', validate({ body: updateUserSchema }), updateUser);

router.get('/permissions', permissionList);
router.post('/permission', createPermission);
router.patch('/permission/:code', updatePermission);
router.delete('/permission/:code', deletePermission);
router.get('/permission/:code', getPermission);

module.exports = router;
