const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user-models');

const ValidationError = require('../errors/validation-err'); // 400 некорректный запрос
const NotFoundError = require('../errors/not-found-err'); // 404
const ConflictError = require('../errors/conflict-err'); // 409

const getUsers = (req, res, next) => { // GET /users
  User
    .find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUserById = (req, res, next) => { // GET /users/id/:userId
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => { // PATCH /users/me
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, { returnDocument: 'after', runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Некорректный запрос'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => { // PATCH /users/me/avatar
  const id = req.user._id;
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(id, { avatar }, { returnDocument: 'after', runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Некорректный запрос'));
      } else {
        next(err);
      }
    });
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
      } else if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => { // POST /signin,
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jsonwebtoken.sign({ _id: user._id }, 'very_difficalt_password', { expiresIn: '7d' });
      res.send({
        token,
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => { // GET /users/me
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  updateUserInfo,
  updateAvatar,
  createUser,
  login,
  getUserInfo,
};
