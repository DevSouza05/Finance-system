"use strict"

document.addEventListener('DOMContentLoaded', function() {
    
    //manipulação do LocalStorage
    const getItensBD = () => {
        const storedItems = JSON.parse(localStorage.getItem("db_items"));
        return storedItems || [];
    };

    const setItensBD = () => {
        localStorage.setItem("db_items", JSON.stringify(items));
    };

    const tbody = document.querySelector("tbody");
    const descItem = document.querySelector("#desc");
    const amount = document.querySelector("#amount");
    const type = document.querySelector("#type");
    const btnNew = document.querySelector("#btnNew");

    const incomes = document.querySelector(".incomes");
    const expenses = document.querySelector(".expenses");
    const total = document.querySelector(".total");

   
    let items = getItensBD(); 

    
    btnNew.onclick = () => {
        
        if (descItem.value.trim() === "" || amount.value.trim() === "" || type.value === "") {
            return alert("Preencha todos os campos!");
        }

        
        const amountValue = parseFloat(amount.value);
        if (isNaN(amountValue) || amountValue <= 0) {
            return alert("O valor deve ser um número positivo.");
        }

        
        items.push({
            desc: descItem.value,
            amount: amountValue.toFixed(2),
            type: type.value,
        });

       
        setItensBD();
        loadItens();

       
        descItem.value = "";
        amount.value = "";
    };

    // deletar item pelo índice
    function deleteItem(index) {
        items.splice(index, 1);  
        setItensBD();  
        loadItens(); 
    }

   
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
                <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    // carregar os itens do LocalStorage na tabela
    function loadItens() {
        tbody.innerHTML = "";  
        items.forEach((item, index) => {
            insertItem(item, index);
        });

        getTotals(); 
    }

  
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

 
    loadItens(); 
});
