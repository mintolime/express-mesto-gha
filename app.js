const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, () => {
  console.log('start !!!');
});
