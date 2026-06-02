const express = require('express');
const router = express.Router();
const Handbag = require('../models/Handbag');

// Obtenir tous les sacs
router.get('/', async (req, res) => {
  try {
    const handbags = await Handbag.find().sort({ createdAt: -1 });
    res.json(handbags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ajouter un sac
router.post('/', async (req, res) => {
  const handbag = new Handbag({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    color: req.body.color,
    image: req.body.image
  });

  try {
    const newHandbag = await handbag.save();
    res.status(201).json(newHandbag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un sac
router.put('/:id', async (req, res) => {
  try {
    const handbag = await Handbag.findById(req.params.id);
    if (!handbag) return res.status(404).json({ message: 'Sac non trouvé' });

    if (req.body.title) handbag.title = req.body.title;
    if (req.body.description) handbag.description = req.body.description;
    if (req.body.price) handbag.price = req.body.price;
    if (req.body.brand) handbag.brand = req.body.brand;
    if (req.body.color) handbag.color = req.body.color;
    if (req.body.image) handbag.image = req.body.image;

    const updatedHandbag = await handbag.save();
    res.json(updatedHandbag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un sac
router.delete('/:id', async (req, res) => {
  try {
    const handbag = await Handbag.findById(req.params.id);
    if (!handbag) return res.status(404).json({ message: 'Sac non trouvé' });

    await handbag.deleteOne();
    res.json({ message: 'Sac supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;