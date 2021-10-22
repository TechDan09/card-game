const Hero = require('../models/hero');

const hero = new Hero();

exports.getHeroes = (req, res) => {
  hero
    .findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};
