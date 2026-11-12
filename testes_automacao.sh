#!/bin/bash

URL="http://localhost:2020/api/v1"

{
  echo "=== INÍCIO DOS TESTES - $(date) ==="
sleep 1
  echo -e "\n--- 1. POST Categorias (201) ---"
  curl -s -X POST "$URL/categorias" -H "Content-Type: application/json" -d '{"nome": "Padaria"}' | jq .
  curl -s -X POST "$URL/categorias" -H "Content-Type: application/json" -d '{"nome": "Eletronicos"}' | jq .
sleep 2
  echo -e "\n--- 2. GET Categorias e GET por ID (200) ---"
  curl -s "$URL/categorias" | jq .
  curl -s "$URL/categorias/1" | jq .
sleep 2
  echo -e "\n--- 3. PATCH e PUT Categorias (200) ---"
  curl -s -X PATCH "$URL/categorias/1" -H "Content-Type: application/json" -d '{"nome": "Confeitaria"}' | jq .
  curl -s -X PUT "$URL/categorias/2" -H "Content-Type: application/json" -d '{"nome": "Informatica"}' | jq .
sleep 2
  echo -e "\n--- 4. POST Produtos (201 e erro 400) ---"
  curl -s -X POST "$URL/produtos" -H "Content-Type: application/json" -d '{"produto": "Pão de Forma", "categoriaId": 1}' | jq .
  curl -s -X POST "$URL/produtos" -H "Content-Type: application/json" -d '{"produto": "Notebook", "categoriaId": 2}' | jq .
  curl -s -X POST "$URL/produtos" -H "Content-Type: application/json" -d '{"produto": ""}' | jq .
sleep 2
  echo -e "\n--- 5. GET Produtos, Filtro Query Param e GET por ID (200) ---"
  curl -s "$URL/produtos" | jq .
  curl -s "$URL/produtos?categoriaId=1" | jq .
  curl -s "$URL/produtos/1" | jq .
sleep 2
  echo -e "\n--- 6. PATCH e PUT Produtos (200) ---"
  curl -s -X PATCH "$URL/produtos/1" -H "Content-Type: application/json" -d '{"produto": "Pão Integral"}' | jq .
  curl -s -X PUT "$URL/produtos/2" -H "Content-Type: application/json" -d '{"produto": "Ultrabook", "categoriaId": 2}' | jq .
sleep 2
  echo -e "\n--- 7. DELETE e Erro 404 ---"
  curl -s -X DELETE "$URL/produtos/1" | jq .
  curl -s "$URL/produtos/1" | jq .
  curl -s -X DELETE "$URL/categorias/1" | jq .
sleep 1
  echo -e "\n=== FIM DOS TESTES ==="
} | tee resultado_execucao.log
