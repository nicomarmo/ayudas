//------------REQUIRES------------//
const express = require('express');
const path = require('path');
const mainController = require('./controllers/mainController');
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const crudRouter = require('./routes/crud');

//------------EXPRESS-----------//
const app = express();
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');


//---------- SIST. DE RUTEO-------------//
app.get('/', mainRouter);
app.get('/users', usersRouter);
app.get('/crud', crudRouter);



app.listen(3000, () =>{
    console.log('http://localhost:3000/');
});