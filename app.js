const express = require('express');

const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users-routes');
const cardRoutes = require('./routes/cards-routes');
const { login, createUser } = require('./controllers/users-controllers');
const { NOT_FOUND_ERROR_CODE } = require('./utils/constants');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

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
