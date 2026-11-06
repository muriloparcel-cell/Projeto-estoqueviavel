const express = require('express');
const cors = require('cors');
const authroutes = require('./src/routes/authroutes');
const gerenciadorErros = require('./src/middlewares/gerenciadorErros');
const { verificarContentTypeJson } = require('./src/middlewares/validarContentType');

const app = express();
const PORT = 2020;

app.use(cors());
app.use(express.json());

// Aplica a validação globalmente antes das rotas
app.use(verificarContentTypeJson);

// Rotas da Aplicação
app.use('/api/v1/produtos', authroutes);

// Rota para URLs não encontradas (404)
app.use((req, res) => {
  res.status(404).json({ status: "NAO_ENCONTRADO", mensagem: "Endpoint não encontrado na API." });
});

// Middleware Global de Tratamento de Erros (Sempre o último middleware!)
app.use(gerenciadorErros);

app.listen(PORT, () => {
  console.log(`Servidor do Mercado ativo na porta ${PORT}`);
});
