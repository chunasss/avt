const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postagensRoutes = require('./routes/postagens');
const comentariosRoutes = require('./routes/comentarios');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/myblog', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/postagens', postagensRoutes);
app.use('/comentarios', comentariosRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
