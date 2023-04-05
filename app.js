const express = require('express');

const app = express();
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { default: helmet } = require('helmet');
const routes = require('./routes/index');
const userRoutes = require('./routes/users-routes');
const cardRoutes = require('./routes/cards-routes');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => console.log('connected to Mongodb'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.use(helmet());
app.use(limiter); // Apply the rate limiting middleware to all requests

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
