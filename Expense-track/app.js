
let expenses = [];

/* =========================
   ADD EXPENSE
========================= */
function addExpense() {
  const date = document.getElementById("expenseDate").value;
  const category = document.getElementById("expenseCategory").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const note = document.getElementById("expenseNote").value;

  if (!date || !category || !amount) {
    alert("Please fill all required fields");
    return;
  }

  console.log(date, category, amount, note)

  expenses.push({ date, category, amount, note });
  console.log(date,category,amount,note);
  renderExpenses(expenses);
  updateSummary(expenses);


};

/* =========================
   RENDER TABLE
========================= */
function renderExpenses(data) {
  const table = document.getElementById("expenseTable");
  table.innerHTML = "";

  data.forEach((exp, index) => {
    table.innerHTML += `
      <tr>
        <td>${exp.date}</td>
        <td>${exp.category}</td>
        <td>${exp.note}</td>
        <td class="text-end text-danger">৳ ${exp.amount}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-outline-danger" onclick="deleteExpense(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

/* =========================
   DELETE EXPENSE
========================= */
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses(expenses);
  updateSummary(expenses);
}

/* =========================
   UPDATE SUMMARY
========================= */
function updateSummary(data) {
  const totalExpense = data.reduce((sum, e) => sum + e.amount, 0);
  const income = 50000; // static for now

  document.getElementById("totalExpense").innerText = `৳ ${totalExpense}`;
  document.getElementById("totalIncome").innerText = `৳ ${income}`;
  document.getElementById("currentBalance").innerText = `৳ ${income - totalExpense}`;
}

/* =========================
   DATE RANGE FILTER
========================= */
document.querySelector(".btn-primary").addEventListener("click", function (e) {
  e.preventDefault();

  const from = document.querySelector("fromDate").value;
  const to = document.getElementById("toDate").value;

  if (!from || !to) {
    alert("Please select both dates");
    return;
  }

  const filtered = expenses.filter(e =>
    e.date >= from && e.date <= to
  );
  console.log(filtered);

  renderExpenses(filtered);
  updateSummary(filtered);
});

