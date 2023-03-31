const User = require('../models/user');
const {
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/constants');

const getUsers = (req, res) => {
  User
    .find({})
    .then((users) => res.status(200).json(users))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' }));
};

const getUser = (req, res) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные пользователя' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

const createUser = (req, res) => {
  User
    .create(req.body)
    .then((result) => res.status(201).json(result))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные пользователя' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

const updateProfile = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, { returnDocument: 'after', runValidators: true })
    .then((user) => {
      if (!name || !about) {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Некорректный запрос' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res
          .status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

const updateAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(id, { avatar }, { returnDocument: 'after', runValidators: true })
    .then((user) => {
      if (!avatar) {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Некорректный запрос' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res
          .status(INCORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
