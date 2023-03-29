const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users));

const getUser = (req, res) => {
  const { id } = req.params;
  return User.findById(id)
    .then((user) => user.status(200).send(user))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка', err }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка', err }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
