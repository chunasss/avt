const mongoose = require('mongoose');

const postagemSchema = new mongoose.Schema({
    titulo: String,
    conteudo: String,
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    curtidas: { type: Number, default: 0 },
});

module.exports = mongoose.model('Postagem', postagemSchema);
