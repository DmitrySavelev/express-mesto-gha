const express = require('express');

const app = express();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const userRoutes = require('./routes/users-routes');
const cardRoutes = require('./routes/cards-routes');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => console.log('connected to Mongodb'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.use(routes);

app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик

app.listen(PORT);
