const Card = require('../models/card');

const createCard = (req, res) => {
  const { id } = req.user;
  const { name,link } = req.body;
  Card.create({
    link,name,
    owner: id,
  }).then((newCard)=>{
    res.send(newCard)
  })
    .catch((err) => {
      res.status(400).send(err);
    });
  console.log(req.body);
};

module.exports = { createCard };
