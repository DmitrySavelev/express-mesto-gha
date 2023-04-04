const router = require('express').Router();
const {
  getUsers,
  // getUser,
  updateUserInfo,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users-controllers');

router.get('/users', getUsers);
// router.get('/users/:userId', getUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateAvatar);
router.get('/users/me', getUserInfo);

module.exports = router;
