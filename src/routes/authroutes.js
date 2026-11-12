const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontrollers');
const { regrasCadastroProduto, regrasAtualizacaoProduto } = require('../middlewares/validarProduto');
const validarRequisicao = require('../middlewares/validarRequisicao');
const { verificarContentTypeJson } = require('../middlewares/validarContentType');


router.get('/', authcontroller.listar);
router.get('/:id', authcontroller.buscarPorId);
router.post('/', regrasCadastroProduto, verificarContentTypeJson, validarRequisicao, authcontroller.cadastrar);
router.patch('/:id', regrasAtualizacaoProduto, validarRequisicao, authcontroller.atualizar);
router.put('/:id', regrasCadastroProduto, verificarContentTypeJson, validarRequisicao, authcontroller.substituir);
router.delete('/:id', authcontroller.deletar);

module.exports = router;
