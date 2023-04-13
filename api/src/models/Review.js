require('dotenv').config();

const { API_KEY } = process.env;
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
          isAlpha: {
            args: true,
            msg: 'El título solo debe contener letras.',
          },
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          async isAppropriate(value) {
            const apiEndpoint = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`;
            //  Acepta 10000 solicitudes gratis al día

            const response = await fetch(apiEndpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                comment: {
                  text: value,
                },
                languages: ['es'],
                requestedAttributes: {
                  TOXICITY: {},
                  SEVERE_TOXICITY: {},
                  IDENTITY_ATTACK: {},
                  INSULT: {},
                  PROFANITY: {},
                  THREAT: {},
                  SEXUALLY_EXPLICIT: {},
                  FLIRTATION: {},
                },
              }),
            });

            if (!response.ok) {
              throw new Error('Error al llamar a la API de Perspective.');
            }

            const { attributeScores } = await response.json();
            const toxicity = attributeScores.TOXICITY.summaryScore.value;
            const severeToxicity = attributeScores.SEVERE_TOXICITY.summaryScore.value;

            if (toxicity >= 0.5 || severeToxicity >= 0.5) {
              throw new Error('El comentario es inapropiado.');
            }
          },
        },
      },
      photo_ticket: {
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
