const usersController = {
    'list': function (req, res) {
        let users = [
            'Tomi',
            'Mateo',
            'Mario Borges',
            'Nico',
            'Alejo',
            'Rama',
            'Brian',
            'Trucha',
            'Mati',
            'Gian'
        ];
        res.render('users.ejs', { 'users': users });
    }
}


module.exports = usersController;
