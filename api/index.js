const express = require('./src/index');
const { db } = require('./src/db');

const PORT = process.env.PORT ?? 3001;

<<<<<<< HEAD
db.sync({ alter: true}).then(() => {
=======
db.sync({ alter: true }).then(() => {
>>>>>>> 02caad6bf6628ce11d00292363b60b713ff6516e
  express.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
