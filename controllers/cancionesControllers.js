let db = require('../database/models');

let cancionesControllers = { 
    crear: function(req,res){
        db.Generos.findAll()
            .then(function(generos){
                return res.render('crearCancion', {generos:generos});
            })
    },
    guardado: function(req,res){
        db.Canciones.create({
            nombre: req.body.titulo,
            compositor: req.body.compositor,
            id_genero: req.body.genero,
        })
        res.redirect('/canciones')        
    },
    listado: function(req,res){
        db.Canciones.findAll({
            limit: 100,
            offset: 3503
        })
            .then(function(canciones){
                res.render('listadoCanciones', {canciones:canciones})
            })
    },
    detalle: function(req,res){
        db.Canciones.findByPk(req.params.id, {
        include: [{association: 'generos'}]
    })
        .then(function(canciones) {
            res.render('songDetail.ejs', {canciones:canciones})
        })
    },
    editar: function(req,res){
        let pedidoCanciones = db.Canciones.findByPk(req.params.id);
        
        let pedidoGeneros = db.Canciones.findAll();
        
        Promise.all([pedidoCanciones, pedidoGeneros])
            .then(function([canciones, generos]){
                res.render('editarCancion.ejs', {canciones:canciones, generos:generos})
            })
    },
    actualizar: function(req,res){
        db.Canciones.update({
            nombre: req.body.titulo,
            compositor: req.body.compositor,
            id_genero: req.body.genero
        }, {
            where: {
                id:req.params.id
            }
        })
        res.redirect('/canciones/' + req.params.id)  
    },
    borrar: function(req,res){
        db.Canciones.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/canciones');
    }
}

module.exports = cancionesControllers;