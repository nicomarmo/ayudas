const fs = require('fs');

function logMiddleware(req, res, next) {
    	fs.appendFileSync('log.txt', 'Se ingreso en la página ' + req.url);

        return next();
};

module.exports = logMiddleware;