const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express(); // Инициализируем создание приложения (сервера)
app.use(express.json());
app.use(userRoutes);
app.use((req, res, next) => {
  req.user = {
    _id: '64249cfb18e8fd39882551b9',
  };
  next();
});

mongoose
  .connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => console.log('connected to Mongodb'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening port ${PORT}`);
  }
});
