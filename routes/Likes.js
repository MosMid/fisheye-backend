const express = require('express');
const auth = require('../middleware/Auth');
const router = express.Router();
const likeCtrl = require('../controllers/Likes');

router.post('/', auth, likeCtrl.addLiker)

router.get('/', auth, likeCtrl.findLiker)

router.delete('/', auth, likeCtrl.deleteLiker)

module.exports = router;