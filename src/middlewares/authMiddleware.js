// Middleware de autenticação

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token de acesso não fornecido" });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ erro: "Formato do token inválido" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ erro: "Token malformatado" });
  }

  // Se a validação for bem-sucedida, passa para o próximo manipulador
  return next();
};
