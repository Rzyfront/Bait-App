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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3],
            msg: 'El título debe tener al menos 3 caracteres.',
          },
          is: {
            args: /^[a-zA-Z\s]*$/,
            msg: 'El título solo debe contener letras y espacios.',
          },
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAppropriate(value) {
            const inappropriateWords = ['boludo', 'idiota', 'hijo de puta', 'negro', 'estúpido', 'estúpida'];
            const words = value.toLowerCase().split(' ');

            const foundInappropriateWord = words.some((word) => inappropriateWords.includes(word));

            if (foundInappropriateWord) {
              throw new Error('El comentario contiene palabras inapropiadas.');
            }
          },
        },
      },
      photoTicket: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
  );
};
