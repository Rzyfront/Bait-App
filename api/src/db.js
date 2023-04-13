require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
  userModel, localModel, reviewModel, menuModel, imageModel, categoryModel, dishModel,
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
dishModel(sequelize);

// DEFINE RELATIONS
const {
  User, Category, Review, Local, Image, Dish, Menu,
} = sequelize.models;

Review.belongsTo(User);
User.hasMany(Category);

Image.belongsTo(Review);
Review.hasMany(Image);

Image.belongsTo(Local);
Local.hasMany(Image);

Local.belongsTo(User);
User.hasMany(Local);

Category.belongsTo(Review);
Review.hasMany(Category);

Dish.belongsTo(Menu);
Menu.hasMany(Dish);

module.exports = {
  ...sequelize.models,
  db: sequelize,
};
