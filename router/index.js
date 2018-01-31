const Express = require('express');
const {
  userList,
  createUser,
  getUser,
  removeRolePermission,
  addRolePermission,
  deleteUser,
} = require('./../controllers/userController');

const router = Express.Router();

router.get('/users', userList);
router.post('/user', createUser);
router.post('/user/:code/role', addRolePermission);
router.post('/user/:code/permission', addRolePermission);
router.delete('/user/:code/role', removeRolePermission);
router.delete('/user/:code/permission', removeRolePermission);
router.delete('/user/:code', deleteUser);
router.get('/user/:code', getUser);

module.exports = router;
