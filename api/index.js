const express = require('express')();

const PORT = process.env.PORT ?? 3001;

express.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
