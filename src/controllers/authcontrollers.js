// Lógica dos controladores de autenticação

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Campos obrigatórios ausentes: nome, email, senha" });
    }

    // Exemplo de retorno com sucesso
    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno no servidor ao registrar." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Campos obrigatórios ausentes: email, senha" });
    }

    // Exemplo de retorno com sucesso
    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token: "exemplo-de-token-jwt"
    });
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno no servidor ao realizar login." });
  }
};
