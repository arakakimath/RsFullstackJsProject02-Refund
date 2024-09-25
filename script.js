// Seleciona os elementos do formulário
const amount = document.getElementById("amount");

// Captura o evento de input para formatar o valor.
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");

  // Transforma o valor em centavos (exemplo: 150/100 = 1.5)
  value = Number(value)/100;

  amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value) {
  // Formata o valor no padrão BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}