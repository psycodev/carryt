const express = require('express');
const router = express.Router();
const db = require('../data/rickandmorty_v1.db');
const authService = require('../services/auth');

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        await authService.register(username, password);
        res.json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;