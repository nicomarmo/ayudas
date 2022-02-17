const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {body, check} = require('express-validator');
const usersController = require('../controllers/usersControllers');
const logDBMiddleware = require('../middlewares/logDBMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


//validaciones
const validations = [
    body('nombre').notEmpty().withMessage('Campo Obligatorio'),
    body('email').isEmail().withMessage('Campo Obligatorio'),
    body('edad').isNumeric().withMessage('Campo Obligatorio'),
    body('password').notEmpty().isLength({min:8}).withMessage('Campo Obligatorio'),
    body('fotoDePerfil').custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('No subiste un archivo');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];


//MULTER
const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/img/avatars'))
},
filename: (req,file,cb) =>{
    console.log(file);
    const newFileName = "fotoPerfil-" + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
}
});
const upload = multer({ storage });




router.get('/', usersController.index);
//router.post('/',validateCreateForm, usersController.store)

router.get('/list', usersController.list);

router.get('/canciones', usersController.songList);
router.get('/canciones/rock', usersController.rock);
router.get('/canciones/top', usersController.songTop);
router.get('/canciones/:id', usersController.songDetail);


router.get('/search', usersController.search);

router.get('/register', guestMiddleware, usersController.register);
//router.post('/register', logDBMiddleware, upload.single("fotoDePerfil"),usersController.create);
router.post('/register',upload.single("fotoDePerfil"), validations, usersController.processRegister);

router.get('/edit/:idUser', usersController.edit);
router.put('/edit', function(req, res){
    res.render("userEdit.ejs");
});

router.delete('/delete/:idUser', function(req, res){
    res.send("viajo por delete");
});

router.get('/login', guestMiddleware, usersController.login);
router.post('/login',[
 check('email').isEmail().withMessage('Email Invalido'),
 check('password').isLength({min:8}).withMessage('La Contraseña no tiene 8 Caracteres')]
,usersController.processLogin);

router.get('/check', function(req,res){
    if (req.session.usuarioLogueado == undefined){
        res.send("No estas Logueado");
    }else {
        res.send("el usuario logueado es " + req.session.usuarioLogueado.email);
    }
})

router.get('/profile',authMiddleware, usersController.profile)

router.get('/logout', usersController.logout)





module.exports = router;