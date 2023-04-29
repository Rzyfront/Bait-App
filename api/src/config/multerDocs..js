const multer = require('multer');
const { extname } = require('path');

const multerDocs = multer({
  storage: multer.diskStorage({
    destination: `${__dirname}/../uploads`,
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const filename = `${file.originalname.split(ext)[0]}-${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
});

module.exports = multerDocs;
