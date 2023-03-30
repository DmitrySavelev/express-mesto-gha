const User = require('../models/user');

const handleError = (res, error) => {
  res.status(500).json({ error });
};

const getUsers = (req, res) => {
  User
    .find()
    .sort({ title: 1 })
    .then((users) => {
      res
        .status(200)
        .json(users);
    })
    .catch((err) => handleError(res, err));
};

const getUser = (req, res) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      res
        .status(200)
        .json(user);
    })
    .catch((err) => handleError(res, err));
};

const createUser = (req, res) => {
  const movie = new User(req.body);
  movie
    .save()
    .then((result) => {
      res
        .status(201)
        .json(result);
    })
    .catch((err) => handleError(res, err));
};

// const createUser = (req, res) => {
//   const { name, about, avatar } = req.body;
//   User.create({ name, about, avatar })
//     .then((user) => res.status(200).send({
//       name: user.name,
//       about: user.about,
//       avatar: user.avatar,
//       _id: user._id,
//     }))
//     .catch((err) => res.status(500).send({ message: 'Произошла ошибка', err }));
// };

module.exports = {
  getUsers,
  getUser,
  createUser,
};
