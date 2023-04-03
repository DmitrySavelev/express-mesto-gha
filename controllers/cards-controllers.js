const Card = require('../models/card-models');
const {
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' }));
};

const createCard = (req, res) => { // POST /cards
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

const deleteCard = (req, res) => { // DELETE /cards/:cardId
  Card
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка с указанным _id не найдена' });
      }
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'Недостаточно прав для удаления карточки' });
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.status(200).send({ deletedCard }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные карточки' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

// const deleteCard = (req, res) => { // DELETE /cards/:cardId
//   console.log('req>>>>>>>>>>', req.params);
//   Card
//     .findByIdAndDelete(req.params.cardId)
//     .then((card) => {
//       if (!card) {
//         return res.status(NOT_FOUND_ERROR_CODE)
// .send({ message: 'Карточка с указанным _id не найдена' });
//       }
//       if (card.owner !== req.user._id) {
//         return res.status(403).send({ message: 'Недостаточно прав для удаления карточки' });
//       }
//       return res.send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res
//           .status(INCORRECT_DATA_ERROR_CODE)
//           .send({ message: 'Переданы некорректные данные карточки' });
//       }
//       return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' });
//     });
// };

const likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

const dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные для снятии лайка' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
