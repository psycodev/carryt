const express = require('express');
const router = express.Router();
const authService = require('../services/auth');

router.post('/', async (req, res) => {
    const token = req.headers.authorization;
    try {
        // Invalidar el token
        await authService.logout(token);
        res.send({ message: 'Sesión cerrada' });
    } catch (err) {
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
});

module.exports = router;