const categorias = [];
const produtos = [];

function obterMenorIdDisponivel(lista) {
  let id = 1;
  while (lista.some(item => item.id === id)) {
    id++;
  }
  return id;
}

const authcontroller = {
	// ==========================================
	// ENTIDADE 1: CATEGORIAS
	// ==========================================

  cadastrarCategoria: (req, res, next) => {
    try {
      const { nome } = req.body;
      const novaCategoria = {
        id: obterMenorIdDisponivel(categorias),
        nome,
        registradoEm: new Date()
      };
      categorias.push(novaCategoria);
      res.status(201).json({
        mensagem: "Categoria cadastrada com sucesso!",
        categoria: novaCategoria
      });
    } catch (erro) {
      next(erro);
    }
  },

  listarCategorias: (req, res, next) => {
    try {
      res.status(200).json({
        total: categorias.length,
        categorias
      });
    } catch (erro) {
      next(erro);
    }
  },

  buscarCategoriaPorId: (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const categoria = categorias.find(c => c.id === id);
      if (!categoria) {
        return res.status(404).json({ status: "NAO_ENCONTRADO", mensagem: "Categoria não encontrada." });
      }
      res.status(200).json(categoria);
    } catch (erro) {
      next(erro);
    }
  },

  atualizarCategoria: (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const { nome } = req.body;
      const item = categorias.find(c => c.id === id);
      if (!item) {
        return res.status(404).json({ status: "NAO_ENCONTRADO", mensagem: "Categoria não encontrada." });
      }
      if (nome !== undefined) item.nome = nome;
      res.status(200).json({ mensagem: "Categoria atualizada com sucesso!", categoria: item });
    } catch (erro) {
      next(erro);
    }
  },

  substituirCategoria: (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const { nome } = req.body;
      const index = categorias.findIndex(c => c.id === id);
      if (index === -1) {
        return res.status(404).json({ status: "NAO_ENCONTRADO", mensagem: "Categoria não encontrada." });
      }
      categorias[index] = {
        id,
        nome,
        registradoEm: categorias[index].registradoEm,
        atualizadoEm: new Date()
      };
      res.status(200).json({ mensagem: "Categoria substituída com sucesso!", categoria: categorias[index] });
    } catch (erro) {
      next(erro);
    }
  },

  deletarCategoria: (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const index = categorias.findIndex(c => c.id === id);
      if (index === -1) {
        return res.status(404).json({ status: "NAO_ENCONTRADO", mensagem: "Categoria não encontrada." });
      }
      const [removida] = categorias.splice(index, 1);
      res.status(200).json({ mensagem: "Categoria removida com sucesso!", categoria: removida });
    } catch (erro) {
      next(erro);
    }
  },

  // ==========================================
  // ENTIDADE 2: PRODUTOS (Relacionada via categoriaId)
  // ==========================================

  cadastrar: (req, res, next) => {
    try {
      const { produto, categoriaId } = req.body;

      if (produto === "ERRO_SIMULADO_500") {
        throw new Error("Falha crítica no processamento interno do servidor!");
      }

      // Verifica se a categoria relacionada existe
      const categoriaExiste = categorias.find(c => c.id === Number(categoriaId));
      if (!categoriaExiste) {
        return res.status(404).json({
          status: "NAO_ENCONTRADO",
          mensagem: `Categoria com ID ${categoriaId} não encontrada.`
        });
      }

      const novoProduto = {
        id: obterMenorIdDisponivel(produtos),
        produto,
        categoriaId: categoriaExiste.id,
        categoriaNome: categoriaExiste.nome,
        registradoEm: new Date()
      };

      produtos.push(novoProduto);

      res.status(201).json({
        mensagem: "Produto cadastrado com sucesso e dados validados!",
        produto: novoProduto
      });
    } catch (erro) {
      next(erro);
    }
  },

  // GET com suporte a Query Parameters (?categoriaId=1 ou ?produto=PAO)
  listar: (req, res, next) => {
    try {
      const { categoriaId, produto } = req.query;
      let resultado = produtos;

      if (categoriaId) {
        resultado = resultado.filter(p => p.categoriaId === Number(categoriaId));
      }

      if (produto) {
        resultado = resultado.filter(p =>
          p.produto.toLowerCase().includes(produto.toLowerCase())
        );
      }

      res.status(200).json({
        total: resultado.length,
        produtos: resultado
      });
    } catch (erro) {
      next(erro);
    }
  },

  // GET por ID
  buscarPorId: (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const item = produtos.find(p => p.id === id);

      if (!item) {
        return res.status(404).json({
          status: "NAO_ENCONTRADO",
          mensagem: "Produto não encontrado."
        });
      }

      res.status(200).json(item);
    } catch (erro) {
      next(erro);
    }
  },

  atualizar: (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const { produto, categoriaId } = req.body;
      const item = produtos.find(p => p.id === id);

      if (!item) {
        return res.status(404).json({
          status: "NAO_ENCONTRADO",
          mensagem: "Produto não encontrado."
        });
      }

      if (categoriaId !== undefined) {
        const categoriaExiste = categorias.find(c => c.id === Number(categoriaId));
        if (!categoriaExiste) {
          return res.status(404).json({
            status: "NAO_ENCONTRADO",
            mensagem: `Categoria com ID ${categoriaId} não encontrada.`
          });
        }
        item.categoriaId = categoriaExiste.id;
        item.categoriaNome = categoriaExiste.nome;
      }

      if (produto !== undefined) item.produto = produto;

      res.status(200).json({
        mensagem: "Produto atualizado com sucesso!",
        produto: item
      });
    } catch (erro) {
      next(erro);
    }
  },

  substituir: (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const { produto, categoriaId } = req.body;
      const index = produtos.findIndex(p => p.id === id);

      if (index === -1) {
        return res.status(404).json({
          status: "NAO_ENCONTRADO",
          mensagem: "Produto não encontrado."
        });
      }

      const categoriaExiste = categorias.find(c => c.id === Number(categoriaId));
      if (!categoriaExiste) {
        return res.status(404).json({
          status: "NAO_ENCONTRADO",
          mensagem: `Categoria com ID ${categoriaId} não encontrada.`
        });
      }

      produtos[index] = {
        id,
        produto,
        categoriaId: categoriaExiste.id,
        categoriaNome: categoriaExiste.nome,
        registradoEm: produtos[index].registradoEm,
        atualizadoEm: new Date()
      };

      res.status(200).json({
        mensagem: "Produto substituído com sucesso!",
        produto: produtos[index]
      });
    } catch (erro) {
      next(erro);
    }
  },

  deletar: (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const index = produtos.findIndex(p => p.id === id);

      if (index === -1) {
        return res.status(404).json({
          status: "NAO_ENCONTRADO",
          mensagem: "Produto não encontrado."
        });
      }

      const [produtoRemovido] = produtos.splice(index, 1);

      res.status(200).json({
        mensagem: "Produto removido com sucesso!",
        produto: produtoRemovido
      });
    } catch (erro) {
      next(erro);
    }
  }
};

module.exports = authcontroller;
