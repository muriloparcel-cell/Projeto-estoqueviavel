#!/bin/bash

LOG="resultado_execucao.log"

echo "=== INÍCIO DOS TESTES ===" > $LOG

# 1. LISTAR CATEGORIAS (GET 200)
echo -e "\n--- GET /categorias ---" >> $LOG
curl -s http://localhost:3000/categorias | jq . >> $LOG

# 2. CRIAR CATEGORIA (POST 201)
echo -e "\n--- POST /categorias ---" >> $LOG
curl -s -X POST http://localhost:3000/categorias \
  -H "Content-Type: application/json" \
  -d '{"nome": "ELETRONICOS", "descricao": "Aparelhos gerais"}' | jq . >> $LOG

# 3. TESTAR ERRO AO CRIAR CATEGORIA SEM NOME (POST 400)
echo -e "\n--- POST /categorias (ERRO 400) ---" >> $LOG
curl -s -X POST http://localhost:3000/categorias \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Sem nome"}' | jq . >> $LOG

# 4. LISTAR PRODUTOS COM FILTRO QUERY PARAM (GET 200)
echo -e "\n--- GET /produtos?status=DISPONIVEL ---" >> $LOG
curl -s "http://localhost:3000/produtos?status=DISPONIVEL" | jq . >> $LOG

# 5. CRIAR PRODUTO (POST 201)
echo -e "\n--- POST /produtos ---" >> $LOG
curl -s -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Mouse", "quantidade": 10, "preco": 50, "categoriaId": 1, "status": "DISPONIVEL"}' | jq . >> $LOG

# 6. ATUALIZAÇÃO PARCIAL DO PRODUTO (PATCH 200)
echo -e "\n--- PATCH /produtos/1 ---" >> $LOG
curl -s -X PATCH http://localhost:3000/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "ESGOTADO"}' | jq . >> $LOG

# 7. DELETAR PRODUTO (DELETE 200)
echo -e "\n--- DELETE /produtos/1 ---" >> $LOG
curl -s -X DELETE http://localhost:3000/produtos/1 | jq . >> $LOG

echo -e "\n=== FIM DOS TESTES ===" >> $LOG

echo "Testes finalizados! Confira o resultado no arquivo $LOG"
