const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const { NOT_FOUND } = require('./utils/errors');

const app = express(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6437e5f06ba23aae2269cb79',
  };
  next();
});

app.use(router);

app.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: 'Такого адреса не существует',
  });
});

app.listen(3000, () => {
  console.log('server working');
});
