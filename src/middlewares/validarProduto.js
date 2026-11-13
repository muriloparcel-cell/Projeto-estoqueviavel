const { body } = require('express-validator');

const regrasCadastroProduto = [
  body('produto')
    .notEmpty().withMessage('O nome do produto é obrigatório.')
    .isString().withMessage('O produto deve ser um texto.')
    .trim()
    .toUpperCase(),

  body('categoriaId')
    .notEmpty().withMessage('O ID da categoria é obrigatório.')
    .isInt({ min: 1 }).withMessage('O categoriaId deve ser um número inteiro válido.')
];

const regrasAtualizacaoProduto = [
  body('produto')
    .optional()
    .isString().withMessage('O produto deve ser um texto.')
    .trim()
    .toUpperCase(),

  body('categoriaId')
    .optional()
    .isInt({ min: 1 }).withMessage('O categoriaId deve ser um número inteiro válido.')
];

const regrasCadastroCategoria = [
  body('nome')
    .notEmpty().withMessage('O nome da categoria é obrigatório.')
    .isString().withMessage('O nome deve ser um texto.')
    .trim()
    .toUpperCase()
];

const regrasAtualizacaoCategoria = [
  body('nome')
    .optional()
    .isString().withMessage('O nome deve ser um texto.')
    .trim()
    .toUpperCase()
];

module.exports = {
  regrasCadastroProduto,
  regrasAtualizacaoProduto,
  regrasCadastroCategoria,
  regrasAtualizacaoCategoria
};
