const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const AuthError = require('../Errors/AuthError');

function auth(req, res, next) {
  const token = req.cookies.jwt;
  let payload;
  if (!token) {
    throw new AuthError('Токен не найден');
  } else {
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new AuthError('Необходима авторизацияя');
    }
    req.user = payload;
    next();
  }
}

module.exports = auth;
