// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const ul = document.querySelector("ul");

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

form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }   
  // console.log(newExpense)

  expenseAdd(newExpense);
}

function expenseAdd(newExpense){
  try {
    // Cria o elemento para adicionar na lista nesse modelo
    /* <li class="expense">
              <img src="./img/food.svg" alt="Ícone de tipo da despesa" />

              <div class="expense-info">
                <strong>Almoço</strong>
                <span>Alimentação</span>
              </div>

              <span class="expense-amount"><small>R$</small>1.420,57</span>

              <img src="./img/remove.svg" alt="remover" class="remove-icon" />
            </li> */
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Adiciona o ícone dentro da li
    expenseItem.append(expenseIcon)

    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona o strong e a span dentro da div
    expenseInfo.append(expenseName)
    expenseInfo.append(expenseCategory)
    // Adiciona a div dentro da li
    expenseItem.append(expenseInfo)

    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$","")}`
    
    // Adiciona a span dentro da li
    expenseItem.append(expenseAmount)

    // Cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // Adiciona o ícone na li
    expenseItem.append(removeIcon)


    // Adiciona a li dentro da ul
    ul.append(expenseItem)

    // Atualiza as despesas totais
    updateTotals()
    
  } catch(error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}

function updateTotals(){
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = ul.children
    console.log(items)
    const headerSpan = document.querySelector("header span")
    headerSpan.textContent = `${items.length} ${items.length != 1 ? "despesas" : "despesa"}`
  } catch(error) {
    console.log(error)
    alert("Não foi possível atualizar os totais de despesas")
  }
}