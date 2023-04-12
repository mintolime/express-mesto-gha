const express = require('express');
const moongoose = require('moongoose')
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express(router);

moongoose.connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, () => {
  console.log('start !!!');
});
