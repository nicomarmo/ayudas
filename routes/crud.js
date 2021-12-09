const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudControllers');

router.get('/crud', crudController.index);



module.exports = router;