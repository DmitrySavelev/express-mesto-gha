// const express = require('express');
// // const path = require('path');
// const mongoose = require('mongoose');
// const usersRouter = require('./routes/users');
// const cardsRouter = require('./routes/cards');

// const { PORT = 3000 } = process.env;
// const app = express();

// // app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('db connected'))
//   .catch((err) => console.error('Could not connect to MongoDB...', err));

// app.use('/users', usersRouter);
// app.use('/cards', cardsRouter);

// usersRouter.get('/users', (req, res) => {
//   res.send('Проверка роутера');
// });

// app.post('/users', (req, res) => {
//   console.log(req + res);
//   res.send(JSON.stringify(req.body));
// });

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });

// const express = require('express');
// const mongoose = require('mongoose');

// const { PORT = 3000 } = process.env;
// const app = express();

// // Подключение к базе данных
// mongoose
//   .connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('db connected'))
//   .catch((err) => console.error('Could not connect to MongoDB...', err));

// // Определение схемы и модели для коллекции "users"
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String,
// });

// const User = mongoose.model('User', userSchema);

// // Маршрут для получения всех пользователей
// app.get('/users', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// // Маршрут для добавления нового пользователя
// app.post('/users', async (req, res) => {
//   const { name, age, email } = req.body;
//   const user = new User({ name, age, email });
//   await user.save();
//   res.json(user);
// });

// // Запуск сервера
// app.listen(PORT, () => console.log('Server started'));

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { NOT_FOUND_ERROR_CODE } = require('./constants/errors');
// const { NOT_FOUND_ERROR_CODE } = require('./utils/constants');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// const path = require('path');
const { PORT = 3000 } = process.env;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use((req, res, next) => {
  req.user = {
    _id: '63c039e916328352a785d0b5',
  };
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Ошибка 404: несуществующая страница' });
});
app.listen(PORT);
