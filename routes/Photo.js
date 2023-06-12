const express = require('express');
const auth = require('../middleware/Auth');
const router = express.Router();
const photoCtrl = require('../controllers/Photo');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, photoCtrl.createPhoto)

router.get('/onePhoto/:id', photoCtrl.getOnePhoto)

router.get('/:id', photoCtrl.getPhotos)

router.put('/:id', auth, photoCtrl.editPhoto)

router.delete('/:id', auth, photoCtrl.deletePhoto)

module.exports = router;