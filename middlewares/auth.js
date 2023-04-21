const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR } = require('../utils/errors');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  // тут будет вся авторизация
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED_ERROR)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET_KEY');
  } catch (err) {
    return res.status(UNAUTHORIZED_ERROR)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};

module.exports = { auth };
