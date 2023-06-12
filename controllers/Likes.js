const Like = require('../models/Likes');
const jwt = require('jsonwebtoken');

exports.addLiker = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    const like = new Like({
        userId: userId,
        mediaId: req.body.mediaId
    });
    console.log(req.body.mediaId)

    like
    .save()
    .then(() => res.status(201).json({ message: 'Likes added!' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.findLiker = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    Like.find({ userId: userId})
    .then(likes => res.status(200).json(likes))
    .catch(error => res.status(400).json({error}));
}

exports.deleteLiker = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    Like.deleteMany({userId: userId, mediaId: req.body.mediaId})
    .then(() => res.status(200).json({message: "Deleted!"}))
    .catch(err => res.status(400).json({err}))
}