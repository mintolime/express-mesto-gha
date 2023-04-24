const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');

const { auth } = require('./middlewares/auth');
const { NOT_FOUND } = require('./utils/errors');
const { createUser, login } = require('./controllers/users');
const { handleErrors } = require('./middlewares/handleErrors');
const limiter = require('./utils/constants/limiter');

const app = express(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
// функционал работы роутеров
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(router);

app.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: 'Такого адреса не существует',
  });
});

app.use(handleErrors);

app.listen(3000, () => {
  console.log('server working');
});
