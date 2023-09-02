const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ValidationError = require('../Errors/ValidationError');
const NotFoundError = require('../Errors/NotFoundError');
const RegError = require('../Errors/RegError');

const { CREATED } = require('../utils/errorCodes');
const User = require('../models/user');

// Создать юзера
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      password: hash,
      email,
    }))
    .then((userData) => {
      const { _id } = userData;
      User.findById(_id)
        .then((fullData) => {
          res.status(CREATED).send(fullData);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new RegError());
      }
      if (err.name === 'ValidationError') {
        return next(new ValidationError());
      }
      return next(err);
    });
};

// Вход
module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-phrase', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
          maxAge: (60 * 60 * 24 * 7),
        })
        .send({ message: 'Успешная авторизация' })
        .end();
    })
    .catch(next);
};

// Выход
module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt')
    .send({ message: 'Выход осуществлен' });
};

// Получить информацию о себе
module.exports.showUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Данных c указанным id не существует'))
    .then((userData) => {
      res.send(userData);
    })
    .catch(next);
};

// Обновить профиль
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Данных c указанным id не существует'))
    .then((userData) => {
      res.send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

// Обновить аватар
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Данных c указанным id не существует'))
    .then((userData) => {
      res.send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

// Получить всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// Получить юзера по ID
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('Данных c указанным id не существует'))
    .then((userData) => {
      res.send(userData);
    })
    .catch(next);
};
