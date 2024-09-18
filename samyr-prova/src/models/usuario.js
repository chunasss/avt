const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router = express.Router();
const SECRET = 'seu_segredo_aqui'; // Use uma variável de ambiente em produção

// Registrar novo usuário
router.post('/registrar', async (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se o email já está em uso
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Email já em uso.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({ nome, email, senha: senhaHash });
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
});

// Login de usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
    }

    const token = jwt.sign({ id: usuario._id, papel: usuario.papel }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Middleware de autenticação
const verificarAutenticacao = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ mensagem: 'Token não fornecido.' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ mensagem: 'Token inválido.' });
        req.usuarioId = decoded.id;
        req.papel = decoded.papel;
        next();
    });
};

// Exibir perfil do usuário
router.get('/perfil', verificarAutenticacao, async (req, res) => {
    const usuario = await Usuario.findById(req.usuarioId).select('-senha'); // Exclui a senha do resultado
    res.json(usuario);
});

module.exports = router;
