const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express(router);

mongoose.connect('mongodb+srv://vmesto-testa:MHe0Ao91nGDbYhpV@cluster1.zpt32lo.mongodb.net/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6437e5f06ba23aae2269cb79',
  };
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log('server working');
});
