const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../data/rickandmorty_v1.db');

async function register(username, password) {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crear un nuevo usuario en la base de datos
    await db.run('INSERT INTO users (username, password) VALUES (?, ?)', username, hashedPassword);
}

async function login(username, password) {
    // Buscar el usuario en la base de datos
    const user = await db.get('SELECT * FROM users WHERE username = ?', username);
    // Verificar si la contraseña es correcta
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Nombre de usuario o contraseña incorrecta');
    }
    // Generar un token de acceso
    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    return { token };
}

async function logout(token) {
    // Invalidar el token en la lista de tokens activos
    activeTokens = activeTokens.filter(t => t !== token);
}

module.exports = { login, logout, register };
    