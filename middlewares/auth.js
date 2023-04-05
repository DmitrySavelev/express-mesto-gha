const jsonwebtoken = require('jsonwebtoken');
const AuthDataError = require('../errors/auth-err');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthDataError('Необходима авторизация'));
  }
  const jwt = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, 'very_difficalt_password');
  } catch (err) {
    return next(new AuthDataError('Необходима авторизация'));
  }
  req.user = payload; // записываем payload в объект запроса
  return next(); // пропускаем запрос дальше
};

module.exports = { auth };
