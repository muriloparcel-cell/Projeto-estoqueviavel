const express = require('express');							// [FLUXO] Carregamento do framework HTTP
const cors = require('cors');								// [FLUXO] Carregamento do controle de acesso
const authroutes = require('./src/routes/authroutes');					// [FLUXO] Importação do módulo de rotas
const categoriaRoutes = require('./src/routes/categoriaRoutes');			// [FLUXO] Importação do modulo de rotas
const gerenciadorErros = require('./src/middlewares/gerenciadorErros');			// [FLUXO] Importação de gerenciador de erros
const { verificarContentTypeJson } = require('./src/middlewares/validarContentType');	// [FLUXO] Importação do validador de conteúdo

const app = express();									// [FLUXO] Instância do servidor
const PORT = 2020;									// [FLUXO] Configuração de porta de entrada

app.use(cors());									// [FLUXO] Habilitação da entrada externa
app.use(express.json());								// [TRANSF] Parsing da entrada (string --> JSON)


app.use((req, res, next) => {								// [TRANSF] Interceptação global da resposta 
  const jsonOriginal = res.json.bind(res);						// [TRANSF] Preservação do método original

  res.json = (corpo) => {								// [TRANSF] Regra de formatação de saída 
    if (corpo && typeof corpo === 'object' && !Array.isArray(corpo)) {			
      corpo.statusHttp = res.statusCode;						// [TRANSF] Enriquecimento do objeto de saída
    }
    return jsonOriginal(corpo);								// [FLUXO] Envio a resposta do cliente
  };

  next();										// [FLUXO] Avanço para proximo Middleware
});

app.use(verificarContentTypeJson);							// [ERRO] Validação crítica do cabecalho

app.use('/api/v1/produtos', authroutes);						// [FLUXO] Direcionamento do fluxo dos produtos
app.use('/api/v1/categorias', categoriaRoutes);						// [FLUXO] Direcionamento do fluxo das categorias

app.use((req, res) => {									// [ERRO] Exceção da rota não encontrada 
  res.status(404).json({ status: "NAO_ENCONTRADO", mensagem: "Endpoint não encontrado na API." });
});

app.use(gerenciadorErros);								// [ERRO] Captura global de exceções

app.listen(PORT, () => {								// [FLUXO] Abertura de conexão para tráfego
  console.log(`Servidor do Mercado ativo na porta ${PORT}`);
});
