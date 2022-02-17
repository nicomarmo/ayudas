//------------REQUIRES------------//
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const methodOverride = require('method-override');

const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const cancionesRouter = require('./routes/canciones');

const logMiddleware = require('./middlewares/logMiddleware');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const session = require('express-session');
const cookie = require('cookie-parser');


//------------EXPRESS-----------//
const app = express();
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
/*app.use((req, res, next) => {
    res.status(404).render("not-found")
})*/
app.use(logMiddleware);

app.use(session({secret: 'Secreto!',
resave: false,
saveUninitialized: false,}));

app.use(userLoggedMiddleware);

app.use(cookie());



//---------- SIST. DE RUTEO-------------//
app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/canciones', cancionesRouter);






app.listen(3000, () =>{
    console.log('http://localhost:3000/');
});