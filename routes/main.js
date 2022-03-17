const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/pruebaSession', function(req, res){
    if (req.session.numeroVisitas == undefined){
        req.session.numeroVisitas = 0;
    } 
    req.session.numeroVisitas++;
    res.send('session tiene el numero: ' + req.session.numeroVisitas);
})

router.get('/mostrarNumeroSession', function(req,res){
    res.send('session tiene el numero: ' + req.session.numeroVisitas);
})


router.get('/gifs', mainController.gifs);
router.get('/gatitos', mainController.gatitos);

module.exports = router; 