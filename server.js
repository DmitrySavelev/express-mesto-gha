const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movie-routes');

// const PORT = 3000; // Определяем порт, на котором будет работать сервер
const { PORT = 3000 } = process.env;
const app = express(); // Инициализируем создание приложения (или сервера)
app.use(express.json());
app.use(movieRoutes);

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
