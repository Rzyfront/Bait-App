/* eslint-disable import/no-extraneous-dependencies */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadata info about our API
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Bait-API', version: '1.0.0' },
  },
  apis: [
    'src/routes/*.js',
    'src/db.js',
    'src/controllers/administrator/*.js',
    'src/controllers/reviews/*.js',
  ],
};
const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Docs are available at http://localhost:${port}/docs C:`);
};
module.exports = swaggerDocs;
