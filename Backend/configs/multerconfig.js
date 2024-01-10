// multerConfig.js
import multer from 'multer';
import generateRandomString from '../utils/generateRandomString.js'; // Assuming you have a utils.js file

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = `${generateRandomString(4)}-${file.originalname}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });
