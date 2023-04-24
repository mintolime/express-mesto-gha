const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const router = require('./routes');
const { auth } = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { handleErrors } = require('./middlewares/handleErrors');
const limiter = require('./utils/constants/limiter');
const NotFoundError = require('./utils/errors/NotFoundError');
const { regExp } = require('./utils/constants/regExp');

const { PORT = 3000 } = process.env;
const app = express(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
// функционал работы роутеров
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regExp),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
// защита всех роутеров авторизацией
app.use('*', auth);
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // центральный обработчик ошибок

app.listen(PORT, () => {
  console.log(`Server working, your port ${PORT}`);
});
