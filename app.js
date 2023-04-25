const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes');
const { auth } = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { handleErrors } = require('./middlewares/handleErrors');
const limiter = require('./utils/constants/limiter');
const NotFoundError = require('./utils/errors/NotFoundError');
const { validationLogin, validationAuthorization } = require('./validation/validation');

const { PORT = 3000 } = process.env;
const app = express(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
// функционал работы роутеров
app.post('/signup', validationAuthorization, createUser);
app.post('/signin', validationLogin, login);

// защита всех роутеров авторизацией
app.use(auth);
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(router);

app.use((req, res, next) => { next(new NotFoundError('Такой страницы не существует')); });

app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // центральный обработчик ошибок

app.listen(PORT, () => { console.log(`Server working, your port ${PORT}`); });
