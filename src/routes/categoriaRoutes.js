const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontrollers');
const { regrasCadastroCategoria, regrasAtualizacaoCategoria } = require('../middlewares/validarProduto');
const validarRequisicao = require('../middlewares/validarRequisicao');

router.get('/', authcontroller.listarCategorias);
router.get('/:id', authcontroller.buscarCategoriaPorId);
router.post('/', regrasCadastroCategoria, validarRequisicao, authcontroller.cadastrarCategoria);
router.patch('/:id', regrasAtualizacaoCategoria, validarRequisicao, authcontroller.atualizarCategoria);
router.put('/:id', regrasCadastroCategoria, validarRequisicao, authcontroller.substituirCategoria);
router.delete('/:id', authcontroller.deletarCategoria);

module.exports = router;
