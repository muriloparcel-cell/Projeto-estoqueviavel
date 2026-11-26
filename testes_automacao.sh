#!/bin/bash

URL="http://localhost:2020/api/v1"

{
  echo "=== INÍCIO DOS TESTES - $(date) ==="
sleep 1
  echo -e "\n--- 1. POST Categorias (201) ---" 									// [FLUXO] Teste requisição POST
  curl -s -X POST "$URL/categorias" -H "Content-Type: application/json" -d '{"nome": "Padaria"}' | jq .
  curl -s -X POST "$URL/categorias" -H "Content-Type: application/json" -d '{"nome": "Eletronicos"}' | jq .
read -p "Pressione Enter para continuar"
sleep 1
  echo -e "\n--- 2. GET Categorias e GET por ID (200) ---"							// [FLUXO] Teste requisição GET e GET por Id
  curl -s "$URL/categorias" | jq .
  curl -s "$URL/categorias/1" | jq .
read -p "Pressione Enter para continuar"
sleep 1
  echo -e "\n--- 3. PATCH e PUT Categorias (200) ---"								// [FLUXO] Teste requisição PATCH e PUT
  curl -s -X PATCH "$URL/categorias/1" -H "Content-Type: application/json" -d '{"nome": "Confeitaria"}' | jq .
  curl -s -X PUT "$URL/categorias/2" -H "Content-Type: application/json" -d '{"nome": "Informatica"}' | jq .
read -p "Pressione Enter para continuar"
sleep 1
  echo -e "\n--- 4. POST Produtos (201 e erro 400) ---"								// [FLUXO] Teste POST Produtos // [ERRO] Teste Erro POST Produtos
  curl -s -X POST "$URL/produtos" -H "Content-Type: application/json" -d '{"produto": "Pão de Forma", "categoriaId": 1}' | jq .
  curl -s -X POST "$URL/produtos" -H "Content-Type: application/json" -d '{"produto": "Notebook", "categoriaId": 2}' | jq .
  curl -s -X POST "$URL/produtos" -H "Content-Type: application/json" -d '{"produto": ""}' | jq .
read -p "Pressione Enter para continuar"
sleep 1
  echo -e "\n--- 5. GET Produtos, Filtro Query Param e GET por ID (200) ---"					// [FLUXO] Teste requisição GET
  curl -s "$URL/produtos" | jq .
  curl -s "$URL/produtos?categoriaId=1" | jq .
  curl -s "$URL/produtos/1" | jq .
read -p "Pressione Enter para continuar"
sleep 1
  echo -e "\n--- 6. PATCH e PUT Produtos (200) ---"								// [FLUXO] Teste requisição PATCH e PUT
  curl -s -X PATCH "$URL/produtos/1" -H "Content-Type: application/json" -d '{"produto": "Pão Integral"}' | jq .
  curl -s -X PUT "$URL/produtos/2" -H "Content-Type: application/json" -d '{"produto": "Ultrabook", "categoriaId": 2}' | jq .
read -p "Pressione Enter para continuar"
sleep 1
  echo -e "\n--- 7. DELETE e Erro 404 ---"									// [FLUXO] Teste requisição DELETE // [ERRO] Teste Erro DELETE
  curl -s -X DELETE "$URL/produtos/1" | jq .
  curl -s "$URL/produtos/1" | jq .
  curl -s -X DELETE "$URL/categorias/2" | jq .
sleep 1
  echo -e "\n=== FIM DOS TESTES ==="
} | tee resultado_execucao.log
