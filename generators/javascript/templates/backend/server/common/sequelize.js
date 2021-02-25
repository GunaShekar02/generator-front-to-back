const { Sequelize } = require('sequelize');

//Fill in your details
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;