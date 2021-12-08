//------------REQUIRES------------//
const express = require('express');
const path = require('path');
const mainRouter = require('./routes/main');

//------------EXPRESS-----------//
const app = express();
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');


//---------- SIST. DE RUTEO-------------//
app.get('/', mainRouter);

app.listen(3000, () =>{
    console.log('http://localhost:3000/');
});


 