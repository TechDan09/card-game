const sql = require('../db');
const Model = require('./model');

class User extends Model {
  constructor() {
    super('users');
  }
}

module.exports = User;

// const user = new User();

// user.findOne({username: "dafafa"})
// 	.then(data => console.log(data.length));

// console.log('here');
