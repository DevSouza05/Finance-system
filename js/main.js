const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount =document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector(".incomes");
const expenses =document.querySelector(".expenses");
const total = document.querySelector(".total");


let items;

function deleteItem(index){
    items.splice(index,1);
    setItensBD(); //seta no banco as informaçoes 
    loadItens();

}

function insertItem(item, index) {
    let tr = document.createElement("tr");

    tr.innerHTML =`
    <td>${item.desc}<td>
    <td>R$ ${item.amount}<td>
    <td class="columnType"> ${
        item.type === "Entrada"
    }
    `
}

function loadItens (){
    items = getItensBD();
    tbody.innerHTML ="";
    items.forEach((item,index) => {
        insertItem(item,index);
    });
}

function getTotals(){
    const amountIcomes = items 
    .filter((items) => items.type ==="Entrada")
    .map
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItensBD = () =>
    localStorage.setItem("db_items",JSON.stringify(items));

    loadItens();