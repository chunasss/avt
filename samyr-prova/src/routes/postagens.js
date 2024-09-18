const express = require('express');
const Postagem = require('../models/Postagem');
const router = express.Router();

// Criar nova postagem
router.post('/', async (req, res) => {
    const { titulo, conteudo, autor } = req.body;
    const novaPostagem = new Postagem({ titulo, conteudo, autor });
    await novaPostagem.save();
    res.status(201).json(novaPostagem);
});

// Listar postagens por autor
router.get('/', async (req, res) => {
    const { autor } = req.query;
    const postagens = await Postagem.find(autor ? { autor } : {});
    res.json(postagens);
});

// Adicionar ou remover curtida
router.post('/:postagemId/curtidas', async (req, res) => {
    const { postagemId } = req.params;
    const postagem = await Postagem.findById(postagemId);
    
    if (!postagem) return res.status(404).send('Postagem não encontrada.');

    postagem.curtidas += 1;
    await postagem.save();
    res.json(postagem);
});

module.exports = router;
