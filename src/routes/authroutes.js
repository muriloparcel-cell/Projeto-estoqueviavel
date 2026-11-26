const express = require('express');											// [FLUXO]
const router = express.Router();											// [FLUXO] 
const authcontroller = require('../controllers/authcontrollers');							// [FLUXO]
const { regrasCadastroProduto, regrasAtualizacaoProduto } = require('../middlewares/validarProduto');			// [FLUXO]
const validarRequisicao = require('../middlewares/validarRequisicao');							// [FLUXO]
const { verificarContentTypeJson } = require('../middlewares/validarContentType');					// [FLUXO]


router.get('/', authcontroller.listar);											// [FLUXO]
router.get('/:id', authcontroller.buscarPorId);
router.post('/', regrasCadastroProduto, verificarContentTypeJson, validarRequisicao, authcontroller.cadastrar);
router.patch('/:id', regrasAtualizacaoProduto, validarRequisicao, authcontroller.atualizar);
router.put('/:id', regrasCadastroProduto, verificarContentTypeJson, validarRequisicao, authcontroller.substituir);
router.delete('/:id', authcontroller.deletar);

module.exports = router;
