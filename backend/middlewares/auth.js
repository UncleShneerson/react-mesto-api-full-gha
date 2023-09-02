const jwt = require('jsonwebtoken');
const AuthError = require('../Errors/AuthError');

function auth(req, res, next) {
  const token = req.cookies.jwt;
  let payload;
  if (!token) {
    throw new AuthError('Токен не найден');
  } else {
    try {
      payload = jwt.verify(token, 'secret-phrase');
    } catch (err) {
      throw new AuthError('Необходима авторизацияя');
    }
    req.user = payload;
    next();
  }
}

module.exports = auth;
