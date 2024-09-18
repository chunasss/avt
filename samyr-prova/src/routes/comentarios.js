const express = require('express');
const Comentario = require('../models/Comentario');
const router = express.Router();

// Adicionar comentário
router.post('/:postagemId', async (req, res) => {
    const { conteudo, usuarioId } = req.body;
    const { postagemId } = req.params;

    const novoComentario = new Comentario({ conteudo, usuarioId, postagemId });
    await novoComentario.save();
    res.status(201).json(novoComentario);
});

// Editar comentário
router.put('/:comentarioId', async (req, res) => {
    const { conteudo } = req.body;
    const { comentarioId } = req.params;

    const comentario = await Comentario.findByIdAndUpdate(comentarioId, { conteudo }, { new: true });
    res.json(comentario);
});

// Excluir comentário
router.delete('/:comentarioId', async (req, res) => {
    const { comentarioId } = req.params;
    await Comentario.findByIdAndDelete(comentarioId);
    res.status(204).send();
});

// Listar comentários de uma postagem
router.get('/:postagemId', async (req, res) => {
    const { postagemId } = req.params;
    const comentarios = await Comentario.find({ postagemId });
    res.json(comentarios);
});



module.exports = router;

