const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards-controllers');
const { cardIdValidation, createCardValidation } = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', createCardValidation, createCard);
router.delete('/cards/:cardId', cardIdValidation, deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
