const router = require('express').Router();
const {
  getCards,
  CreateCard,
  deleteCard,
  updateProfile,
  updateAvatar,
  addLike,
  removeLike,
} = require('../controllers/users-controllers');

router.get('/cards', getCards);
router.post('/cards', CreateCard);
router.delete('/cards/:cardId', deleteCard);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);
router.put('/cards/:cardId/likes', addLike);
router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;
