const fs = require('fs');

function logDBMiddleware(req, res, next) {
    	fs.appendFileSync('logDB.txt', 'Se creo un registro al entrar en la página ' + req.url);

        return next();
};

module.exports = logDBMiddleware;