const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    conteudo: String,
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    postagemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Postagem' },
});

module.exports = mongoose.model('Comentario', comentarioSchema);
