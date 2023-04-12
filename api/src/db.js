require('dotenv').config();
const { Sequelize } = require('sequelize');
const { userModel, localModel , menuModel } = require('./models/index');

const sequelize = new Sequelize(
  process.env.DB_URL,
  {
   
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  },
);


// DEFINE MODELS
menuModel(sequelize);
localModel(sequelize);
userModel(sequelize);

// DEFINE RELATIONS

module.exports = {
  ...sequelize.models,
  db: sequelize, // import connection { db } = require('./db.js');
};
