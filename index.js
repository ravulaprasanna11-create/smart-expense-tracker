let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
function addTransaction() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;

  if (desc === "" || amount === "") {
    alert("Please fill all fields");
    return;
  }

  let transaction = {
    id: Date.now(),
    desc,
    amount: +amount,
    type
  };

  transactions.push(transaction);
  saveData();
  displayTransactions();
}
function displayTransactions() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  transactions.forEach(t => {
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";

    li.innerHTML = `
      <span class="${t.type}">
        ${t.desc} - ₹${t.amount}
      </span>
      <button onclick="deleteTransaction(${t.id})" class="btn btn-danger btn-sm">X</button>
    `;

    list.appendChild(li);
  });

  updateSummary();
}
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveData();
  displayTransactions();
}
function updateSummary() {
  let income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  let expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  document.getElementById("income").innerText = income;
  document.getElementById("expense").innerText = expense;
  document.getElementById("balance").innerText = income - expense;
}
function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
displayTransactions();