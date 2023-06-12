const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type. Only PNG and JPEG files are allowed.'));
    }
  };

const upload = multer({ storage, fileFilter }).single('file');

module.exports = upload;

// const multer = require('multer');

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// }

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'images')
//     },
//     filename: (req, file, callback) => {
//         const name = file.originalname.split(' ').join('_');
//         const extention = MIME_TYPES[file.mimetype];
//         callback(null, name + Date.now() + '.' + extention);
//     }
// })

// module.exports = multer({storage}).single('file');