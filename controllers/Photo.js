const  Photo = require('../models/Photo');
const jwt = require('jsonwebtoken');

exports.createPhoto = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    const newPhoto = new Photo({
    title: req.body.title,
    date: req.body.date,
    likes: req.body.likes,
    photographer: userId,
    file: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        fileName: req.file.originalname
    }
    });

    newPhoto
    .save()
    .then(() => res.status(201).json({ message: 'Saved to database!' }))
    .catch((error) => res.status(400).json({ error }));
  
    //   const object = JSON.parse(req.body);
    //   const { _id, userId: _, ...data } = object;
  
    //   const photo = new Photo({
    //     ...data,
    //     photographer: userId,
    //     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    //   });
  
    //   photo.save()
    //     .then(() => res.status(201).json({ message: 'Saved to the database!' }))
    //     .catch((error) => res.status(400).json({ error }));
    // } catch (error) {
    //   res.status(401).json({ error: 'Invalid token' });
    // }
};

exports.editPhoto = (req, res, next) => {
    Photo.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id })
    .then(() => res.status(200).json({message: "Updated!"}))
    .catch(err => res.status(400).json({err}))
}

exports.deletePhoto = (req, res, next) => {
    Photo.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: "Deleted!"}))
    .catch(err => res.status(400).json({err}))
}

exports.deletePhotos = (req, res, next) => {
    Photo.deleteMany({photographer: req.body.photographer})
    .then(() => res.status(200).json({message: "Deleted!"}))
    .catch(err => res.status(400).json({err}))
}

exports.getOnePhoto = (req, res) => {
    Photo.findOne({ _id: req.params.id})
    .then(photo => res.status(200).json(photo))
    .catch(error => res.status(400).json({error}));
}

exports.getPhotos = (req, res) => {
    // {photographer: "646b3d1f73afba29c2c0bc30"}
    Photo.find({photographer: req.params.id}, {file: 0})
    .then(photo => res.status(200).json(photo))
    .then(photo => console.log(photo))
    .catch(error => res.status(400).json({error}));
}