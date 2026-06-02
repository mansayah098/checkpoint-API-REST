require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const handbagRoutes = require('./routes/handbags');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connecter à MongoDB (Remplacez par votre URI si nécessaire)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/handbags-shop')


// Routes
app.use('/api/handbags', handbagRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API Sacs à main fonctionnelle !');
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur tournant sur le port ${PORT}`);
});