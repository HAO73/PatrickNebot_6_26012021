
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');

require('dotenv').config();

const atlasUser = process.env.ATLAS_USER
const atlasPassword = process.env.ATLAS_PASSWORD

mongoose.connect(`mongodb+srv://${atlasUser}:${atlasPassword}@cluster0.qs7vs.mongodb.net/SoPekocko?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(cors())

  app.use(bodyParser.json());
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/api/sauces', sauceRoutes);

  app.use('/', userRoutes);

module.exports = app;  