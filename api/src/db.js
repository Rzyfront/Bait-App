require('dotenv').config();

const { Sequelize } = require('sequelize');
 
const MODELS = require('./models/index');

const sequelize = new Sequelize(
  process.env.DB_URL,
  {

    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  },
);

// DEFINE MODELS
for (const key in MODELS) {//eslint-disable-line
  // Recorre y define los modelos
  MODELS[key](sequelize);
}

// DEFINE RELATIONS
const {
  User, Local, Image, Dish, Menu, Review, Characteristics,
} = sequelize.models;

Image.belongsTo(Review);
Review.hasMany(Image);

Review.belongsTo(Local);
Local.hasMany(Review);

Image.belongsTo(Local);
Local.hasMany(Image);

Local.belongsTo(User);
User.hasMany(Local);

Dish.belongsTo(Menu);
Menu.hasMany(Dish);

Menu.belongsTo(Local);
Local.hasOne(Menu);

Local.hasOne(Characteristics, { onDelete: 'CASCADE' });
Characteristics.belongsTo(Local, { onDelete: 'CASCADE' });

module.exports = {
  ...sequelize.models,
  db: sequelize,
};
