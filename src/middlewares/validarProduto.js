const { body } = require('express-validator');						// [FLUXO] Importação do express-validator

const regrasCadastroProduto = [								// [ERRO] Filtrgem de texto caso tenha algum erro no cadastro de algum produto ou categoria
  body('produto')
    .notEmpty().withMessage('O nome do produto é obrigatório.')
    .isString().withMessage('O produto deve ser um texto.')
    .trim()
    .toUpperCase(),

  body('categoriaId')
    .notEmpty().withMessage('O ID da categoria é obrigatório.')
    .isInt({ min: 1 }).withMessage('O categoriaId deve ser um número inteiro válido.')
];

const regrasAtualizacaoProduto = [							// [ERRO] Filtragem de texto caso o produto esteja escrito incorretamente
  body('produto')
    .optional()
    .isString().withMessage('O produto deve ser um texto.')
    .trim()
    .toUpperCase(),

  body('categoriaId')
    .optional()
    .isInt({ min: 1 }).withMessage('O categoriaId deve ser um número inteiro válido.')
];

const regrasCadastroCategoria = [							// [ERRO] Filtragem de texto no caso de erro na syntaxe
  body('nome')
    .notEmpty().withMessage('O nome da categoria é obrigatório.')
    .isString().withMessage('O nome deve ser um texto.')
    .trim()
    .toUpperCase()
];

const regrasAtualizacaoCategoria = [							// [ERRO] Filtragem de texto caso os requisitos estiver escrito incorretamente
  body('nome')
    .optional()
    .isString().withMessage('O nome deve ser um texto.')
    .trim()
    .toUpperCase()
];

module.exports = {									// [FLUXO] Exportação para routes
  regrasCadastroProduto,
  regrasAtualizacaoProduto,
  regrasCadastroCategoria,
  regrasAtualizacaoCategoria
};
