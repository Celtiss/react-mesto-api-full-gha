require('dotenv').config();
const token = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  // верифицируем токен
  let payload;
  try {
    payload = token.verify(jwt, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  next();
};
