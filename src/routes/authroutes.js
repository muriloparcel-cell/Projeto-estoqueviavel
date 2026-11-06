const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontrollers');
const { regrasCadastroProduto } = require('../middlewares/validarProduto');
const validarRequisicao = require('../middlewares/validarRequisicao');
const { verificarContentTypeJson } = require('../middlewares/validarContentType');


router.get('/', authcontroller.listar); 
router.post('/', regrasCadastroProduto, verificarContentTypeJson, validarRequisicao, authcontroller.cadastrar);

module.exports = router;
