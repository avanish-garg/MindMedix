const express = require('express');
const { getUsersWithSameSymptoms } = require('../controllers/userController');
const router = express.Router();

router.get('/users/symptoms', getUsersWithSameSymptoms);

module.exports = router;
