const express = require('express');

const app = express(); // Инициализируем создание приложения (сервера)
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const {
  NOT_FOUND_ERROR_CODE,
} = require('./utils/constants');

const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '64249cfb18e8fd39882551b9',
  };
  next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(cardRoutes);
app.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Ошибка 404: несуществующая страница' });
});

mongoose
  .connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => console.log('connected to Mongodb'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT);
