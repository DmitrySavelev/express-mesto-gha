const User = require('../models/user');

const handleError = (res, error) => {
  res.status(500).json({ error });
};

const getUsers = (req, res) => {
  User
    .find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => handleError(res, err));
};

const getUser = (req, res) => {
  User
    .findById(req.params.userId)
    .then((user) => res.status(200).json(user))
    .catch((err) => handleError(res, err));
};

const createUser = (req, res) => {
  User
    .create(req.body)
    .then((result) => res.status(201).json(result))
    .catch((err) => handleError(res, err));
};

const updateProfile = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(id, { name, about })
    .then((result) => res.status(200).json(result))
    .catch((err) => handleError(res, err));
};

const updateAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(id, { avatar })
    .then((result) => res.status(200).json(result))
    .catch((err) => handleError(res, err));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
