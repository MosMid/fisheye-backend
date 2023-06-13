const  Profil = require('../models/Profil');
const jwt = require('jsonwebtoken');

exports.createProfil = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
  
    Profil.findOne({ photographer: userId })
      .then((profil) => {
        if (profil === null) {
          const newProfil = new Profil({
            fullName: req.body.fullName,
            country: req.body.country,
            city: req.body.city,
            tagLine: req.body.tagLine,
            dailyRate: req.body.dailyRate,
            photographer: userId,
            file: {
              data: req.file.buffer,
              contentType: req.file.mimetype,
              fileName: req.file.originalname
            }
          });
  
          newProfil
            .save()
            .then(() => res.status(201).json({ message: 'Saved to database!' }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          console.log('Profile already exists!');
          next();
        }
      })
      .catch((error) => res.status(400).json({ error }));
  };

exports.updateProfil = (req, res, next) => {
    console.log("called")
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(userId)

    Profil.updateOne({photographer: userId})
    .then(() => console.log('updated!'))
    .catch(err => res.status(400).json({err}))
    next();
}

exports.deleteProfil = (req, res, next) => {
    // const token = req.headers.authorization.split(' ')[1];
    // const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // const userId = decodedToken.userId;

    Profil.deleteOne({fullName: req.body.fullName})
    .then(() => res.status(200).json({message: 'Deleted!'}))
    .catch(err => res.status(400).json({err}))
}

exports.getAllProfils = (req, res) => {
    Profil.find()
    .then(profil => res.status(200).json(profil))
    .catch(error => res.status(400).json({error}));
}

exports.getProfil = (req, res) => {
    Profil.findOne({ photographer: req.params.id})
    .then(profil => res.status(200).json(profil))
    .catch(error => res.status(400).json({error}));
}