const Sequelize = require('sequelize');

const db = new Sequelize('forms', 'root', 'nopass', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

const Ship = db.define('ship', {
  address: Sequelize.STRING,
  line: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING
});

const Bill = db.define('bill', {
  credit: Sequelize.STRING,
  exp: Sequelize.STRING,
  cvv: Sequelize.STRING,
  billing: Sequelize.STRING
});


module.exports = {
  db: db,
  User: User,
  Ship: Ship,
  Bill: Bill
}