// простите, не запушила ветку main до конца
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes');
const appAuth = require('./routes/auth');
const { auth } = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');
const limiter = require('./utils/constants/limiter');

const { PORT = 3000 } = process.env;
const app = express(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
// функционал работы роутеров
app.use(appAuth);
// защита всех роутеров авторизацией
app.use(auth);
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(router);

app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // центральный обработчик ошибок

app.listen(PORT, () => { console.log(`Server working, your port ${PORT}`); });
