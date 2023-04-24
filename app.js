const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');

const router = require('./routes');
const { auth } = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { handleErrors } = require('./middlewares/handleErrors');
const limiter = require('./utils/constants/limiter');
const NotFoundError = require('./utils/errors/NotFoundError');
const { regExp } = require('./utils/constants/regExp');

const app = express(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
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
app.use(auth);
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(router);

app.use((next) => {
  next(new NotFoundError('Такого адреса не существует'));
});

app.use(handleErrors);

app.listen(3000, () => {
  console.log('server working');
});
