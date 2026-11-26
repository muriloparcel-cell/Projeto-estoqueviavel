const express = require('express');
const cors = require('cors');
const authroutes = require('./src/routes/authroutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');
const gerenciadorErros = require('./src/middlewares/gerenciadorErros');
const { verificarContentTypeJson } = require('./src/middlewares/validarContentType');

const app = express();
const PORT = 2020;

app.use(cors());
app.use(express.json());

// [TRANSF] Insere o status HTTP
app.use((req, res, next) => {
  const jsonOriginal = res.json.bind(res);

  res.json = (corpo) => {
    if (corpo && typeof corpo === 'object' && !Array.isArray(corpo)) {
      corpo.statusHttp = res.statusCode;
    }
    return jsonOriginal(corpo);
  };

  next();
});

// [TRANSF] Aplica a validação globalmente antes das rotas
app.use(verificarContentTypeJson);

// [FLUXO] Rotas da Aplicação
app.use('/api/v1/produtos', authroutes);
app.use('/api/v1/categorias', categoriaRoutes);

// [ERRO] Rota para URLs não encontradas (404)
app.use((req, res) => {
  res.status(404).json({ status: "NAO_ENCONTRADO", mensagem: "Endpoint não encontrado na API." });
});

// [FLUXO] Middleware Global de Tratamento de Erros (Sempre o último middleware!)
app.use(gerenciadorErros);

app.listen(PORT, () => {
  console.log(`Servidor do Mercado ativo na porta ${PORT}`);
});
