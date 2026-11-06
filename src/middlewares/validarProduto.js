const { body } = require('express-validator');
const anoAtual = new Date().getFullYear();

const regrasCadastroProduto = [
  body('produto')
    .notEmpty().withMessage('O nome do produto é obrigatório.')
    .isString().withMessage('O produto deve ser um texto.')
    .trim()
    .toUpperCase(),
  
  body('categoria')
    .notEmpty().withMessage('A categoria é obrigatória.')
];
module.exports = { regrasCadastroProduto };
