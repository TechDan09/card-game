const sql = require('../db');
const Model = require('./model');

class Hero extends Model {
  constructor() {
    super('heroes');
  }
}

module.exports = Hero;

// const hero = new Hero();

// hero.findAll().then((data) => console.log(data));

// console.log('here');

// console.log('i am here');
