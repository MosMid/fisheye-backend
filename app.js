const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const photoRoutes = require('./routes/Photo');
const userRoutes = require('./routes/User');
const profilRoutes = require('./routes/Profil');
const likeRoutes = require('./routes/Likes');
const path = require('path');

async function connect(){
    await mongoose.connect('mongodb://localhost/cluster1',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
}
connect();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req, res, next) => {
  res.end('Fish-eye server rocks !');
  next();
})

app.use(bodyParser.json());

app.use('/api/photos', photoRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/profil', profilRoutes);
app.use('/api/likes', likeRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;