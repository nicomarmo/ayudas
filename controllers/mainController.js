const mainController = {
    'index': (req, res) => {
        res.render('main.ejs');
    }, 
    'gifs': (req,res)=> {
        res.render('gifsPopulares');
    },
    'gatitos': (req,res)=> {
        res.render('gatitos');
    },
};

module.exports = mainController;