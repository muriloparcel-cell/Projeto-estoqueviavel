const express = require('express');
const authRoutes = require('./src/routes/authroutes');

const app = express();

// Configura o middleware para aceitar JSON no corpo da requisição
app.use(express.json());

// Registra o conjunto de rotas de autenticação sob o prefixo /auth
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
