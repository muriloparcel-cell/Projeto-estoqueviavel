const categorias = [];                                      // [FLUXO] Armazenamento em memória (fonte de dados)
const produtos = [];                                        // [FLUXO] Armazenamento em memória (fonte de dados)

// [TRANSF] Regra para obter o menor Id possível no cadastro de um produto ou categoria
function obterMenorIdDisponivel(lista) {
  let id = 1;                                               // [TRANSF] Inicialização do contador de ID
  while (lista.some(item => item.id === id)) {              // [TRANSF] Verificação de disponibilidade na lista
    id++;                                                   // [TRANSF] Incremento para testar próximo ID
  }
  return id;                                                // [FLUXO] Retorno do ID calculado
}

const authcontroller = {
  // ==========================================
  // ENTIDADE 1: CATEGORIAS
  // ==========================================
  cadastrarCategoria: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const { nome } = req.body;                            // [FLUXO] Entrada de dados da requisição
      const novaCategoria = {                               // [TRANSF] Construção e regra de negócio
        id: obterMenorIdDisponivel(categorias),             // [TRANSF] Cálculo/regra para definição de ID
        nome,                                               // [TRANSF] Mapeamento do campo
        registradoEm: new Date()                            // [TRANSF] Enriquecimento de dado (timestamp)
      };
      categorias.push(novaCategoria);                       // [FLUXO] Escrita na fonte de dados (array)
      res.status(201).json({                                // [FLUXO] Saída/retorno da API
        mensagem: "Categoria cadastrada com sucesso!",
        categoria: novaCategoria
      });
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  listarCategorias: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      res.status(200).json({                                // [FLUXO] Leitura da fonte de dados e saída da API
        total: categorias.length,                           // [TRANSF] Cálculo da quantidade de registros
        categorias
      });
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  buscarCategoriaPorId: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const id = parseInt(req.params.id);                   // [FLUXO] Entrada de parâmetro e conversão de tipo
      const categoria = categorias.find(c => c.id === id);  // [FLUXO] Consulta/busca na fonte de dados
      if (!categoria) {                                     // [ERRO] Validação de existência do recurso
        return res.status(404).json({                       // [ERRO] Retorno de erro HTTP 404 (Não encontrado)
          status: "NAO_ENCONTRADO",
          mensagem: "Categoria não encontrada."
        });
      }
      res.status(200).json(categoria);                      // [FLUXO] Saída/retorno da API
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  atualizarCategoria: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const id = parseInt(req.params.id);                   // [FLUXO] Entrada de parâmetro de rota
      const { nome } = req.body;                            // [FLUXO] Entrada de dados do corpo da requisição
      const item = categorias.find(c => c.id === id);       // [FLUXO] Busca do registro na fonte de dados
      if (!item) {                                          // [ERRO] Validação de existência do recurso
        return res.status(404).json({                       // [ERRO] Retorno de erro HTTP 404 (Não encontrado)
          status: "NAO_ENCONTRADO",
          mensagem: "Categoria não encontrada."
        });
      }
      if (nome !== undefined) item.nome = nome;             // [TRANSF] Atualização parcial do campo na memória
      res.status(200).json({                                // [FLUXO] Saída/retorno da API
        mensagem: "Categoria atualizada com sucesso!",
        categoria: item
      });
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  substituirCategoria: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const id = parseInt(req.params.id);                   // [FLUXO] Entrada de parâmetro de rota
      const { nome } = req.body;                            // [FLUXO] Entrada de dados do corpo da requisição
      const index = categorias.findIndex(c => c.id === id); // [FLUXO] Localização do índice na fonte de dados
      if (index === -1) {                                   // [ERRO] Validação de existência do recurso
        return res.status(404).json({                       // [ERRO] Retorno de erro HTTP 404 (Não encontrado)
          status: "NAO_ENCONTRADO",
          mensagem: "Categoria não encontrada."
        });
      }
      categorias[index] = {                                 // [TRANSF] Substituição completa do objeto
        id,                                                 // [TRANSF] Preservação do ID original
        nome,                                               // [TRANSF] Mapeamento do novo valor
        registradoEm: categorias[index].registradoEm,       // [TRANSF] Preservação do timestamp original
        atualizadoEm: new Date()                            // [TRANSF] Enriquecimento de dado (timestamp de edição)
      };
      res.status(200).json({                                // [FLUXO] Saída/retorno da API
        mensagem: "Categoria substituída com sucesso!",
        categoria: categorias[index]
      });
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  deletarCategoria: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const id = parseInt(req.params.id);                   // [FLUXO] Entrada de parâmetro de rota
      const index = categorias.findIndex(c => c.id === id); // [FLUXO] Localização do índice na fonte de dados
      if (index === -1) {                                   // [ERRO] Validação de existência do recurso
        return res.status(404).json({                       // [ERRO] Retorno de erro HTTP 404 (Não encontrado)
          status: "NAO_ENCONTRADO",
          mensagem: "Categoria não encontrada."
        });
      }
      const [removida] = categorias.splice(index, 1);       // [FLUXO] Remoção do registro na fonte de dados
      res.status(200).json({                                // [FLUXO] Saída/retorno da API
        mensagem: "Categoria removida com sucesso!",
        categoria: removida
      });
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  // ==========================================
  // ENTIDADE 2: PRODUTOS (Relacionada via categoriaId)
  // ==========================================

  cadastrar: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const { produto, categoriaId } = req.body;            // [FLUXO] Entrada de dados da requisição

      if (produto === "ERRO_SIMULADO_500") {                // [ERRO] Condição de teste para simular falha
        throw new Error("Falha crítica no processamento interno do servidor!"); // [ERRO] Disparo manual de exceção
      }

      // [TRANSF] Regra de integridade referencial (verifica se categoria existe)
      const categoriaExiste = categorias.find(c => c.id === Number(categoriaId)); // [FLUXO] Consulta na fonte de categorias
      if (!categoriaExiste) {                               // [ERRO] Validação de chave estrangeira
        return res.status(404).json({                       // [ERRO] Retorno de erro HTTP 404 (Categoria inexistente)
          status: "NAO_ENCONTRADO",
          mensagem: `Categoria com ID ${categoriaId} não encontrada.`
        });
      }

      const novoProduto = {                                 // [TRANSF] Construção e regra de negócio
        id: obterMenorIdDisponivel(produtos),               // [TRANSF] Cálculo/regra para definição de ID
        produto,                                            // [TRANSF] Mapeamento do campo
        categoriaId: categoriaExiste.id,                    // [TRANSF] Vinculação de chave estrangeira
        categoriaNome: categoriaExiste.nome,                // [TRANSF] Desnormalização/enriquecimento de dado
        registradoEm: new Date()                            // [TRANSF] Enriquecimento de dado (timestamp)
      };

      produtos.push(novoProduto);                           // [FLUXO] Escrita na fonte de dados (array)

      res.status(201).json({                                // [FLUXO] Saída/retorno da API
        mensagem: "Produto cadastrado com sucesso e dados validados!",
        produto: novoProduto
      });
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  // GET com suporte a Query Parameters (?categoriaId=1 ou ?produto=PAO)
  listar: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const { categoriaId, produto } = req.query;           // [FLUXO] Entrada de parâmetros de consulta (query)
      let resultado = produtos;                             // [FLUXO] Leitura inicial da fonte de dados

      if (categoriaId) {                                    // [TRANSF] Filtro condicional por ID da categoria
        resultado = resultado.filter(p => p.categoriaId === Number(categoriaId));
      }

      if (produto) {                                        // [TRANSF] Filtro condicional textual (case-insensitive)
        resultado = resultado.filter(p =>
          p.produto.toLowerCase().includes(produto.toLowerCase())
        );
      }

      res.status(200).json({                                // [FLUXO] Saída/retorno da API
        total: resultado.length,                            // [TRANSF] Cálculo da quantidade filtrada
        produtos: resultado
      });
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  // GET por ID
  buscarPorId: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const id = parseInt(req.params.id);                   // [FLUXO] Entrada de parâmetro de rota
      const item = produtos.find(p => p.id === id);         // [FLUXO] Consulta/busca na fonte de dados

      if (!item) {                                          // [ERRO] Validação de existência do recurso
        return res.status(404).json({                       // [ERRO] Retorno de erro HTTP 404 (Não encontrado)
          status: "NAO_ENCONTRADO",
          mensagem: "Produto não encontrado."
        });
      }

      res.status(200).json(item);                           // [FLUXO] Saída/retorno da API
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  atualizar: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const id = parseInt(req.params.id);                   // [FLUXO] Entrada de parâmetro de rota
      const { produto, categoriaId } = req.body;            // [FLUXO] Entrada de dados do corpo da requisição
      const item = produtos.find(p => p.id === id);         // [FLUXO] Busca do registro na fonte de dados

      if (!item) {                                          // [ERRO] Validação de existência do recurso
        return res.status(404).json({                       // [ERRO] Retorno de erro HTTP 404 (Não encontrado)
          status: "NAO_ENCONTRADO",
          mensagem: "Produto não encontrado."
        });
      }

      if (categoriaId !== undefined) {                      // [TRANSF] Verificação de atualização de relacionamento
        const categoriaExiste = categorias.find(c => c.id === Number(categoriaId)); // [FLUXO] Consulta na fonte de categorias
        if (!categoriaExiste) {                             // [ERRO] Validação de integridade da nova categoria
          return res.status(404).json({                     // [ERRO] Retorno de erro HTTP 404 (Categoria inexistente)
            status: "NAO_ENCONTRADO",
            mensagem: `Categoria com ID ${categoriaId} não encontrada.`
          });
        }
        item.categoriaId = categoriaExiste.id;              // [TRANSF] Atualização da chave estrangeira
        item.categoriaNome = categoriaExiste.nome;          // [TRANSF] Atualização do dado desnormalizado
      }

      if (produto !== undefined) item.produto = produto;    // [TRANSF] Atualização parcial do nome do produto

      res.status(200).json({                                // [FLUXO] Saída/retorno da API
        mensagem: "Produto atualizado com sucesso!",
        produto: item
      });
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  substituir: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const id = parseInt(req.params.id);                   // [FLUXO] Entrada de parâmetro de rota
      const { produto, categoriaId } = req.body;            // [FLUXO] Entrada de dados do corpo da requisição
      const index = produtos.findIndex(p => p.id === id);   // [FLUXO] Localização do índice na fonte de dados

      if (index === -1) {                                   // [ERRO] Validação de existência do recurso
        return res.status(404).json({                       // [ERRO] Retorno de erro HTTP 404 (Não encontrado)
          status: "NAO_ENCONTRADO",
          mensagem: "Produto não encontrado."
        });
      }

      const categoriaExiste = categorias.find(c => c.id === Number(categoriaId)); // [FLUXO] Consulta na fonte de categorias
      if (!categoriaExiste) {                               // [ERRO] Validação de integridade da categoria
        return res.status(404).json({                       // [ERRO] Retorno de erro HTTP 404 (Categoria inexistente)
          status: "NAO_ENCONTRADO",
          mensagem: `Categoria com ID ${categoriaId} não encontrada.`
        });
      }

      produtos[index] = {                                   // [TRANSF] Substituição completa do objeto
        id,                                                 // [TRANSF] Preservação do ID original
        produto,                                            // [TRANSF] Mapeamento do novo nome
        categoriaId: categoriaExiste.id,                    // [TRANSF] Vinculação da chave estrangeira
        categoriaNome: categoriaExiste.nome,                // [TRANSF] Enriquecimento com nome da categoria
        registradoEm: produtos[index].registradoEm,         // [TRANSF] Preservação do timestamp original
        atualizadoEm: new Date()                            // [TRANSF] Enriquecimento de dado (timestamp de edição)
      };

      res.status(200).json({                                // [FLUXO] Saída/retorno da API
        mensagem: "Produto substituído com sucesso!",
        produto: produtos[index]
      });
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  },

  deletar: (req, res, next) => {
    try {                                                   // [ERRO] Início da proteção contra falhas
      const id = parseInt(req.params.id);                   // [FLUXO] Entrada de parâmetro de rota
      const index = produtos.findIndex(p => p.id === id);   // [FLUXO] Localização do índice na fonte de dados

      if (index === -1) {                                   // [ERRO] Validação de existência do recurso
        return res.status(404).json({                       // [ERRO] Retorno de erro HTTP 404 (Não encontrado)
          status: "NAO_ENCONTRADO",
          mensagem: "Produto não encontrado."
        });
      }

      const [produtoRemovido] = produtos.splice(index, 1);  // [FLUXO] Remoção do registro na fonte de dados

      res.status(200).json({                                // [FLUXO] Saída/retorno da API
        mensagem: "Produto removido com sucesso!",
        produto: produtoRemovido
      });
    } catch (erro) {                                        // [ERRO] Captura de exceção
      next(erro);                                           // [ERRO] Repasse da falha para tratamento
    }
  }
};

module.exports = authcontroller;                            // [FLUXO] Exportação do módulo para uso nas rotas
