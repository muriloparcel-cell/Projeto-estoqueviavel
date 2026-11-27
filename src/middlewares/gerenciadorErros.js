const gerenciadorErros = (err, req, res, next) => {   		// [FLUXO] Carregamento da função de gerenciador de erros
  console.error(`[ERRO INTERNAL API]: ${err.message}`);
  
  res.status(500).json({
    status: "ERRO_INTERNO",
    mensagem: "Ocorreu um erro interno no servidor.",
    detalhes: err.message
  });
};

module.exports = gerenciadorErros;
