const express = require('express');
const router = express.Router();
const authService = require('../services/auth');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await authService.login(username, password);
        res.send({ token: user.token });
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
});

module.exports = router;
