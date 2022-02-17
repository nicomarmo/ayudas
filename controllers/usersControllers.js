const fs = require('fs');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { Sequelize } = require('../database/models');
const Op = Sequelize.Op

const usersController = {
    'index': (req, res) => {
        res.render('users.ejs');
    },
    'songList': function(req, res){
        	db.Canciones.findAll({
                include: [{association: "generos"}]
            })
            .then((canciones) => {
                res.render('canciones', {canciones:canciones})
            })
    },
    'songDetail': function(req,res){
        db.Canciones.findByPk(req.params.id)
        .then(function(canciones) {
            res.render('songDetail.ejs', {canciones:canciones})
        })
    },
    'rock': function(req,res){
        db.Canciones.findAll({
            where: {
                id_genero: 1
            }
        })
            .then((canciones) => {
                res.render('rock', {canciones:canciones})
            })
    },
    'songTop':(req,res) =>{
        db.Canciones.findAll({
            where: {
                milisegundos: {[db.Sequelize.Op.gte] : 300000}
            },
            order: [
                ["nombre", "ASC"]
            ],
            limit: 100,
            offset: 40
        })
            .then((canciones) => {
                res.render('songTop', {canciones:canciones})
            })
    },
    'list': (req, res) => {
        let users = [
            { id: 1, name: 'Marianela' },
            { id: 2, name: 'Nicolas' },
            { id: 3, name: 'Karina' },
            { id: 4, name: 'Fabian' },
            { id: 5, name: 'Sofia' },

        ];

        res.render('userList.ejs', { 'users': users });
    },
    'search': function (req, res) { //GET
        let loQueBuscoElUsuario = req.query.search;

        let users = [
            { id: 1, name: 'Marianela' },
            { id: 2, name: 'Nicolas' },
            { id: 3, name: 'Karina' },
            { id: 4, name: 'Fabian' },
            { id: 5, name: 'Sofia' },

        ];

        let usersResults = [];

        for (let i = 0; i < users.length; i++) {
            if (users[i].name.includes(loQueBuscoElUsuario)) {
                usersResults.push(users[i]);
            }
        }
        res.render('userResults.ejs', { usersResults: usersResults });
    },
    'create': (req, res) => {
        let usuarios = {
            nombre: req.body.nombre,
            edad: req.body.edad,
            email: req.body.email
        }
        res.send(usuarios);
    },
    'edit': (req, res) => {
        let idUser = req.params.idUser;

        let users = [
            { id: 1, name: 'Marianela' },
            { id: 2, name: 'Nicolas' },
            { id: 3, name: 'Karina' },
            { id: 4, name: 'Fabian' },
            { id: 5, name: 'Sofia' },

        ];
        let userToEdit = users[idUser];

        res.render("userEdit", { userToEdit: userToEdit });
    },
    /*store: (req, res) => {
        let errors = validationResult(req);
        res.send(errors);
        let user = req.body;
        userId = usersModel.create(user);
        res.redirect('/users/register' + userId);
    }, */
    register: function (req, res) {
        return res.render('register.ejs');
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        //return res.send(resultValidation.mapped());
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = User.findByField('email', req.body.email);


        if (userInDB) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'este email ya esta en uso'
                    },
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        let userCreated = User.create(userToCreate);

        return res.redirect('/users/login');
    },
    login: function (req, res) {
        return res.render('login');
    },
    processLogin: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password
                req.session.userLogged = userToLogin;

                if (req.body.rememberUser){
                    res.cookie('email', req.body.userEmail, {maxAge: (1000 * 60)*2})
                }

                return res.redirect('/users/profile');
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'las credenciales son invalidas'
                    }
                }
            });
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email'
                }
            }
        });
    },

    profile: (req, res) => {
        res.render('profile', {
            user: req.session.userLogged,
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/users/login');
    },

};

module.exports = usersController;