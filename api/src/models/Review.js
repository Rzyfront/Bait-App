const { DataTypes } = require('sequelize');
const { isAppropriate } = require('../helpers/badWords');

module.exports = (sequelize) => {
  sequelize.define(
    'Review',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: 'Title must be between 3 and 50 characters long.',
          },
          is: {
            args: /^[a-zA-Z0-9ñÑ\s]*$/i,
            msg: 'Title can only contain letters, numbers, and spaces.',
          },
        },
      },
      comment: {
        type: DataTypes.STRING(700),
        allowNull: false,
        validate: {
          len: {
            args: [1, 700],
            msg: 'Comment must be between 1 and 700 characters long.',
          },
          containsBadWords(value) {
            if (isAppropriate(value)) {
              throw new Error('Comment contains inappropriate language.');
            }
          },
        },
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      food: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'The "food" value must be an integer.',
          },
          max: {
            args: 5,
            msg: 'The maximum allowed value for "food" is 5.',
          },
        },
      },
      service: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'The "service" value must be an integer.',
          },
          max: {
            args: 5,
            msg: 'The maximum allowed value for "service" is 5.',
          },
        },
      },
      environment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'The "environment" value must be an integer.',
          },
          max: {
            args: 5,
            msg: 'The maximum allowed value for "environment" is 5.',
          },
        },
      },
      qaPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'The "qaPrice" value must be an integer.',
          },
          max: {
            args: 5,
            msg: 'The maximum allowed value for "qaPrice" is 5.',
          },
        },
      },
      rating: {
        type: DataTypes.FLOAT,
      },
    },
  );
};
