const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontrollers');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Exemplo de rota protegida por middleware
router.get('/perfil', authMiddleware, (req, res) => {
  return res.status(200).json({ mensagem: "Acesso autorizado ao perfil!" });
});

module.exports = router;
