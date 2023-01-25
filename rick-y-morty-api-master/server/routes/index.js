let router = require('express').Router();
const authenticate = require('../services/authentication');

router
    .all('*', (req, res, next) => {
        const {
            token
        } = req.headers;

        if( false // TESTING !!!
            // !token || token !== '#TOKEN12345=='
        ){
            res
                .status(401)
                .send('401: not authorized')
                .end()
            ;
        } else {
            next();
        }
    })
    
    .use('/characters', require('./characters'))
    .use('/locations', require('./locations'))
    .use('/episodes', require('./episodes'))
    .use('/login', require ('./login'))
    .use('/logout', require ('./logout'))
    .use('/register', require ('./registerUsu'))
    .use('/crud', require('./crud'))

    //rutas protegidas se activara si el token es valido
    .get('/characters', authenticate, (req, res) => {
        res.json({ message: 'Ruta secreta' });
    })

    .get('/locations', authenticate, (req, res) => {
        res.json({ message: 'Ruta secreta' });
    })

    .get('/episodes', authenticate, (req, res) => {
        res.json({ message: 'Ruta secreta' });
    });
;

module.exports = router;