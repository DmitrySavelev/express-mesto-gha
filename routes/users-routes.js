const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users-controllers');

const {
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/id/:userId', userIdValidation, getUserById);
router.patch('/users/me', updateUserValidation, updateUserInfo);
router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);
router.get('/users/me', getUserInfo);

module.exports = router;
