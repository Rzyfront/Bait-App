require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
  userModel, localModel, reviewModel, menuModel, imageModel, categoryModel,
} = require('./models/index');

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
reviewModel(sequelize);
imageModel(sequelize);
categoryModel(sequelize);

// DEFINE RELATIONS
const { Category, Review } = sequelize.models;

Category.belongsTo(Review);
Review.hasMany(Category);

module.exports = {
  ...sequelize.models,
  db: sequelize,
};
