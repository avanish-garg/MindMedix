const express = require('express');
const Tip = require('../models/tip');

const router = express.Router();

// Get tips based on mood
router.get('/:mood', async (req, res) => {
  try {
    const tips = await Tip.find({ mood: req.params.mood });
    res.json(tips);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Populate tips in the database
router.post('/populate', async (req, res) => {
  const tips = [
    { mood: 'Nostalgic', tip: 'Comfort foods like mac and cheese, apple pie, and chocolate chip cookie or anything which binds you to the memory.' },
    { mood: 'sad', tip: 'To combat sadness, consider indulging in dark chocolate for its mood-boosting properties and honey for its natural sugars. Pineapple can enhance mood with bromelain, while Greek yogurt supports gut health.Whole grain bread stabilizes blood sugar, and cottage cheese offers protein and calcium for sustained energy.' },
    { mood: 'anxious', tip: 'To alleviate anxiety, include turkey for tryptophan, eggs for protein and B vitamins, and oranges for vitamin C. Sweet potatoes stabilize blood sugar, while legumes like lentils maintain energy levels. Avocados offer healthy fats, chia seeds provide omega-3s, and beets improve blood flow. Dark leafy greens, such as collard greens, add magnesium for additional support.' },
    { mood: 'stressed', tip: 'Eating a balanced diet can help alleviate stress and improve mood. Foods such as dark chocolate, bananas, and berries provide antioxidants, while nuts and fatty fish like salmon offer healthy fats and omega-3s that reduce anxiety. Leafy greens and oatmeal can enhance serotonin levels, promoting well-being. Incorporating these foods into meals—like spinach salads, overnight oats, and herbal teas—can support mental health..' },
  ];

  try {
    await Tip.insertMany(tips);
    res.status(201).send('Tips added successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
