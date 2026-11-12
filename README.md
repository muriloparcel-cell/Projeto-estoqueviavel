# API RESTful — Produtos e Categorias

API desenvolvida em **Node.js** e **Express** para gerenciamento de **Categorias** e **Produtos** relacionados em memória, com validação de dados (`express-validator`), automação de testes via Bash (`curl` + `jq`) e controle de processos no Linux.

---

## 🛠️ Tecnologias

- Node.js & Express
- Express Validator
- Shell Script (`curl` e `jq`)

---

## 🚀 Como Executar

1. Instale as dependências:
   ```bash
   npm install
   npm install cors
   npm install jq curl -y
Inicie o servidor (porta 2020):

Bash
npm start
(Para rodar em segundo plano: npm start &)

🔗 Rotas da API (/api/v1)
Categorias (/categorias)
GET /categorias — Lista todas as categorias (200)

GET /categorias/:id — Busca categoria por ID (200 / 404)

POST /categorias — Cria categoria: {"nome": "Padaria"} (201 / 400)

PATCH /categorias/:id — Atualiza parcialmente (200 / 404)

PUT /categorias/:id — Substitui completamente (200 / 400 / 404)

DELETE /categorias/:id — Remove categoria (200 / 404)

Produtos (/produtos)
GET /produtos — Lista produtos; aceita filtro ?categoriaId=1 ou ?produto=PAO (200)

GET /produtos/:id — Busca produto por ID (200 / 404)

POST /produtos — Cria produto vinculado: {"produto": "Pão", "categoriaId": 1} (201 / 400 / 404)

PATCH /produtos/:id — Atualiza parcialmente (200 / 404)

PUT /produtos/:id — Substitui completamente (200 / 400 / 404)

DELETE /produtos/:id — Remove produto (200 / 404)

🧪 Testes Automatizados
Com o servidor ativo, execute o script para testar todas as rotas e gerar o log resultado_execucao.log:

Bash
chmod +x testes_automacao.sh
./testes_automacao.sh
⚙️ Gestão de Processos (Linux)
Bash
# Listar processos Node.js ativos e ver o PID
ps aux | grep node

# Encerrar o servidor pelo PID
kill -9 <PID>
