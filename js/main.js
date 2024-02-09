const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount =document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector(".incomes");
const expenses =document.querySelector(".expenses");
const total = document.querySelector(".total");


let items;

const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
