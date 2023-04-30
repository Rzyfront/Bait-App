const { DataTypes } = require('sequelize');

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
        },
      },
      verified: {
        type: DataTypes.ENUM('verified', 'unVerified', 'archived'),
        defaultValue: 'unVerified',
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
      toxicity: {
        type: DataTypes.FLOAT,
      },
    },
  );
};
/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         title:
 *           type: string
 *           maxLength: 50
 *         comment:
 *           type: string
 *           maxLength: 700
 *         verified:
 *           type: string
 *           enum: ['verified', 'unVerified', 'archived']
 *         food:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *         service:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *         environment:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *         qaPrice:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *         rating:
 *           type: number
 *           format: float
 *         toxicity:
 *           type: number
 *           format: float
 *       required:
 *         - title
 *         - comment
 *         - food
 *         - service
 *         - environment
 *         - qaPrice
 *       example:
 *         id: 1
 *         title: "Review Title"
 *         comment: "This is a sample review comment."
 *         verified: "unVerified"
 *         food: 4
 *         service: 3
 *         environment: 5
 *         qaPrice: 2
 *         rating: 4.5
 *         toxicity: 0.2
*/
