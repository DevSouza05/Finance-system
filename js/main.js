"use strict"

// Espera o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    
    // Funções para manipulação do LocalStorage
    const getItensBD = () => {
        const storedItems = JSON.parse(localStorage.getItem("db_items"));
        return storedItems || [];
    };

    const setItensBD = () => {
        localStorage.setItem("db_items", JSON.stringify(items));
    };

    // Seleção de elementos do DOM
    const tbody = document.querySelector("tbody");
    const descItem = document.querySelector("#desc");
    const amount = document.querySelector("#amount");
    const type = document.querySelector("#type");
    const btnNew = document.querySelector("#btnNew");
    const btnAuxilioIA = document.querySelector("#btnAuxilioIA");

    const incomes = document.querySelector(".incomes");
    const expenses = document.querySelector(".expenses");
    const total = document.querySelector(".total");

    let items = getItensBD();  // Carrega os itens do LocalStorage

    // Função de clique no botão "Incluir"
    btnNew.onclick = () => {
        
        // Validação de campos obrigatórios
        if (descItem.value.trim() === "" || amount.value.trim() === "" || type.value === "") {
            return alert("Preencha todos os campos!");
        }

        // Validação do valor
        const amountValue = parseFloat(amount.value);
        if (isNaN(amountValue) || amountValue <= 0) {
            return alert("O valor deve ser um número positivo.");
        }

        // Adiciona o novo item à lista
        items.push({
            desc: descItem.value,
            amount: amountValue.toFixed(2),
            type: type.value,
        });

        // Atualiza o LocalStorage e recarrega a lista
        setItensBD();
        loadItens();

        // Limpa os campos de entrada
        descItem.value = "";
        amount.value = "";
    };

    // Função de deletar item
    function deleteItem(index) {
        // Remove o item do array
        items.splice(index, 1);
        // Atualiza o LocalStorage
        setItensBD();
        // Recarrega os itens na tabela
        loadItens();
    }

    // Função para inserir um item na tabela
    function insertItem(item, index) {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.desc}</td>
            <td>R$ ${item.amount}</td>
            <td class="columnType">
                ${item.type === "Entrada"
                    ? '<i class="bx bxs-chevron-up-circle"></i>'
                    : '<i class="bx bxs-chevron-down-circle"></i>'}
            </td>
            <td class="columnAction">
                <button class="deleteBtn" data-index="${index}">
                    <i class='bx bx-trash'></i>
                </button>
            </td>
        `;
        
        // Adiciona a linha à tabela
        tbody.appendChild(tr);

        // Adiciona o evento de deleção no botão de excluir
        tr.querySelector(".deleteBtn").addEventListener("click", function() {
            const index = parseInt(this.getAttribute("data-index"));
            deleteItem(index);
        });
    }

    // Função para carregar os itens na tabela
    function loadItens() {
        tbody.innerHTML = "";  // Limpa a tabela
        items.forEach((item, index) => {
            insertItem(item, index);
        });

        getTotals();  // Atualiza os totais
    }

    // Função para calcular e mostrar os totais
    function getTotals() {
        const amountIncomes = items.filter(item => item.type === "Entrada").map(item => parseFloat(item.amount));
        const amountExpenses = items.filter(item => item.type === "Saída").map(item => parseFloat(item.amount));

        const totalIncomes = amountIncomes.reduce((acc, cur) => acc + cur, 0).toFixed(2);
        const totalExpenses = amountExpenses.reduce((acc, cur) => acc + cur, 0).toFixed(2);
        const totalBalance = (parseFloat(totalIncomes) - parseFloat(totalExpenses)).toFixed(2);

        incomes.textContent = totalIncomes;
        expenses.textContent = totalExpenses;
        total.textContent = totalBalance;
    }

    // Função de integração com a IA (simulação de uma resposta da IA)
    async function callAuxilioIA() {
        const analysisData = {
            totalIncomes: parseFloat(incomes.textContent),
            totalExpenses: parseFloat(expenses.textContent),
            totalBalance: parseFloat(total.textContent),
            items: items
        };

        try {
            const response = await fetch('https://sua-api-de-ia.com/analise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(analysisData)
            });
            
            const data = await response.json();
            alert(data.recommendations);

        } catch (error) {
            console.error("Erro ao chamar a IA:", error);
            alert("Erro ao buscar recomendações.");
        }
    }

    // Botão Auxílio IA
    btnAuxilioIA.onclick = callAuxilioIA;

    // Carrega os itens ao iniciar
    loadItens(); 
});
