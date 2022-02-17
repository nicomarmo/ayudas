const express = require('express');
const cancionesControllers = require('../controllers/cancionesControllers');
const router = express.Router();
//const path = require('path');


//Creaación
router.get('/crear', cancionesControllers.crear);
router.post('/crear', cancionesControllers.guardado);

//Lectura
router.get('/', cancionesControllers.listado);

//Detalle
router.get('/:id', cancionesControllers.detalle);

//Actualizacion
router.get('/editar/:id', cancionesControllers.editar);
router.post('/editar/:id', cancionesControllers.actualizar);

//Borrado
router.post('/borrar/:id', cancionesControllers.borrar);

module.exports = router;