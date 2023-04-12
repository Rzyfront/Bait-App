require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_URL, {
  logging: false,
  native: false,
});

module.exports = {
  db,
  ...db.models,
};
