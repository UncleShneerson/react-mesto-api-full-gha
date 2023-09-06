require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const sendError = require('./middlewares/sendError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const { PORT, JWT_SECRET } = require('./utils/config');

const app = express();
app.use(helmet());
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(requestLogger);

// Краш тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const User = require('./models/user');
const showData = (req, res, next) => {
  User.findById(req.user._id)
    .then((userData) => {
      res.send(userData);
      res.send(PORT, JWT_SECRET);
    })
    .catch(next);
};

app.get('/data', showData);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(sendError);

app.listen(PORT);
