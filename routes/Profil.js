const express = require('express');
const auth = require('../middleware/Auth');
const router = express.Router();
const profilCtrl = require('../controllers/Profil');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, profilCtrl.createProfil);

router.get('/:id', profilCtrl.getProfil);

router.get('/', profilCtrl.getAllProfils)

router.put('/', auth, profilCtrl.updateProfil)

router.delete('/', profilCtrl.deleteProfil)

module.exports = router;