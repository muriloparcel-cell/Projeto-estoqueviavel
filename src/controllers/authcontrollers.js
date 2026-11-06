const produtos = [];

const authcontroller = {
	// Método POST
	cadastrar: (req, res, next) => {
		try {
			const { produto, categoria } = req.body;
	// Simulação de erro interno não previsto se categoria for especial
			if (categoria === "ERRO_SIMULADO_500") {
				throw new Error("Falha crítica no processamento interno do servidor!");
			}

			const novoProduto = {
				id: produtos.length + 1,
				produto,
				categoria,
				registradoEm: new Date()
			};

			// Adiciona o produto na lista
			produtos.push(novoProduto);

			res.status(201).json({
				mensagem: "Produto cadastrado com sucesso e dados validados!",
				produto: { produto, categoria, registradoEm: new Date() }
			});
		} catch (erro) {
			next(erro); // Encaminha o erro para o Middleware Global
		}
	},

	// Método GET
	listar: (req, res, next) => {
		try {
			res.status(200).json({
				total: produtos.length,
				produtos: produtos
			});
		} catch (erro) {
			next(erro);
		}
	},

	// Método PATCH
	atualizar: (req, res, next) => {
		try {
			const id = parseInt(req.params.id);
			const { produto, categoria } = req.body;
			// Encontra o produto na lista pelo ID
			const item = produtos.find(p => p.id === id);
			if (!item) {
				return res.status(404).json({
					status: "NAO_ENCONTRADO",
					mensagem: "Produto não encontrado."
				});
			}
			// Atualiza apenas os campos que foram enviados
			if (produto !== undefined) item.produto = produto;
			if (categoria !== undefined) item.categoria = categoria;
			res.status(200).json({
				mensagem: "Produto atualizado com sucesso!",
				produto: item
			});
		} catch (erro) {
			next(erro);
		}
	}
};

module.exports = authcontroller;
