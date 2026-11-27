#!/bin/bash

# [FLUXO] Definindo endpoint de origem e arquivo CSV de destino
API_URL="http://localhost:2020/api/v1/produtos"
CSV_OUT="dataset_analitico.csv"

echo "[FLUXO] Extraindo dados brutos da API..."
DADOS_JSON=$(curl -s "$API_URL")

# [ERRO] Verificando se a API respondeu com JSON válido
if [ -z "$DADOS_JSON" ] || ! echo "$DADOS_JSON" | jq empty 2>/dev/null; then
  echo "[ERRO] Falha na extração: API offline ou resposta não é um JSON válido."
  exit 1
fi

# [TRANSF] Convertendo JSON (.produtos[]) para formato tabular CSV usando jq
echo "[TRANSF] Transformando JSON em CSV..."
echo "$DADOS_JSON" | jq -r '
  (["ID","PRODUTO","CATEGORIA_ID","CATEGORIA_NOME","REGISTRADO_EM","ATUALIZADO_EM"] | @csv),
  (.produtos[] | [
    .id,
    (.produto | ascii_upcase),
    .categoriaId,
    (.categoriaNome | ascii_upcase),
    .registradoEm,
    (.atualizadoEm // .registradoEm)
  ] | @csv)
' > "$CSV_OUT"

echo "[SUCESSO] Dataset gerado em $CSV_OUT:"
cat "$CSV_OUT"

# [TRANSF] Bônus: Gráfico de Barras em Bash Puro
echo ""
echo "=== DISTRIBUIÇÃO POR CATEGORIA ==="
tail -n +2 "$CSV_OUT" | tr -d '"' | awk -F',' '
{
  contagem[$4]++
}
END {
  for (cat in contagem) {
    printf "%-15s | ", cat
    for (i = 0; i < contagem[cat]; i++) printf "█"
    printf " (%d)\n", contagem[cat]
  }
}'
