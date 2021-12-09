const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');

router.get('/users', usersController.list);

module.exports = router;