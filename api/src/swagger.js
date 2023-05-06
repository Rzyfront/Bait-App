/* eslint-disable import/no-extraneous-dependencies */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadata info about our API
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bait-API',
      version: '1.0.0',
      description: 'Esta es una RESTFUL API desarrolada para bait-app en ella se pueden encontrar todos lo endpoint utilizados por el frontend, hay algunos endpoints que no estan documentados deibido a la falta de tiempo y por que de momento no son utilizados por el frontend.Att:Franco Gutierrez(franco4457)',
    },
    basePath: '/',
  },
  apis: [
    'src/routes/*.js',
    'src/db.js',
    'src/models/*.js',
    'src/controllers/**/*.js',
    'src/responsesSwagger/*.js',
  ],
};
const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Docs are available at ${process.env.SERVER_DEPLOY}/docs C:`);
};
module.exports = swaggerDocs;
