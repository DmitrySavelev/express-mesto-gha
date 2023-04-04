const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user-models');
const {
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/constants');

const ValidationError = require('../errors/validation-err'); // 400 некорректный запрос
// const AuthError = require('../errors/auth-err'); // 401 не авторизован
// const NotFoundError = require('../errors/not-found-err'); //404
const ConflictError = require('../errors/conflict-err'); // 409
// const DefaultError = require('../errors/default-err'); // 500

const getUsers = (req, res, next) => { // GET /users
  User
    .find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUser = (req, res) => { // GET /users/:userId
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.send({ data: user });
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

const updateUserInfo = (req, res, next) => { // PATCH /users/me
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, { returnDocument: 'after', runValidators: true })
    .then((user) => {
      if (!name || !about) {
        throw new ValidationError('Некорректный запрос');
      }
      return res.send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => { // PATCH /users/me/avatar
  const id = req.user._id;
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(id, { avatar }, { returnDocument: 'after', runValidators: true })
    .then((user) => {
      if (!avatar) {
        throw new ValidationError('Некорректный запрос');
      }
      return res.send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => { // POST /signup
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные пользователя'));
      }
      if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует'));
      }
    });
};

const login = (req, res) => { // POST /signin,
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jsonwebtoken.sign({ _id: user._id }, 'very_difficalt_password', { expiresIn: '7d' });
      res.send({
        token,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getUserInfo = (req, res, next) => { // GET /users/me
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND_ERROR_CODE('Пользователь по указанному _id не найден');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new INCORRECT_DATA_ERROR_CODE('Переданы некорректные данные пользователя'));
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  updateUserInfo,
  updateAvatar,
  createUser,
  login,
  getUserInfo,
};
