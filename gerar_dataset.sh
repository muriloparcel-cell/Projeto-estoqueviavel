#!/bin/bash

API_URL="http://localhost:2020/api/v1/produtos"
ARQUIVO_SAIDA="dataset_produtos.csv"

echo "=== Iniciando Pipeline ETL (Estoque) ==="

# [FLUXO] Extract: Consome o endpoint da API e captura o código HTTP
HTTP_STATUS=$(curl -s -o /tmp/raw_data.json -w "%{http_code}" "$API_URL")

# [ERRO] Valida se a fonte de ingestão respondeu com sucesso (HTTP 200)
if [ "$HTTP_STATUS" -ne 200 ]; then
  echo "[ERRO] Falha na extração de $API_URL. HTTP Status: $HTTP_STATUS"
  exit 1
fi

# [TRANSF] Transform & [FLUXO] Load: Higieniza nulos (//) e exporta para CSV
jq -r '
  (["ID","PRODUTO","CATEGORIA_ID","CATEGORIA_NOME","REGISTRADO_EM","ATUALIZADO_EM"] | @csv),
  (.produtos[] | [
    .id,
    (.produto | ascii_upcase),
    .categoriaId,
    (.categoriaNome | ascii_upcase),
    .registradoEm,
    (.atualizadoEm // .registradoEm)
  ] | @csv)
' /tmp/raw_data.json > "$ARQUIVO_SAIDA"

# [ERRO] Verifica se o arquivo foi gerado e não está vazio
if [ ! -s "$ARQUIVO_SAIDA" ]; then
  echo "[ERRO] O arquivo CSV gerado está vazio."
  exit 1
fi

echo "[FLUXO] Load concluído! Arquivo salvo em: $ARQUIVO_SAIDA"

# [TRANSF] Resumo estatístico rápido no terminal (Analytics)
TOTAL_PRODUTOS=$(jq '.produtos | length' /tmp/raw_data.json)
NAO_EDITADOS=$(jq '[.produtos[] | select(.atualizadoEm == null)] | length' /tmp/raw_data.json)

echo "----------------------------------------"
echo "Métricas Rápidas (Data Science Preview):"
echo "Total de produtos cadastrados: $TOTAL_PRODUTOS"
echo "Registros originais sem edição: $NAO_EDITADOS"
echo "Produtos por categoria:"
jq -r '.produtos | group_by(.categoriaNome)[] | "  - \(.[0].categoriaNome): \(length)"' /tmp/raw_data.json
echo "----------------------------------------"
