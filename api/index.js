const express = require('./src/index');
const { db } = require('./src/db');
const swaggerDocs = require('./src/swagger');

const PORT = process.env.PORT ?? 3001;

db.sync({ alter: true })
  .then(() => {
    express.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
      swaggerDocs(express);
    });
  })
  .catch((err) => {
    console.log(err);
  });
