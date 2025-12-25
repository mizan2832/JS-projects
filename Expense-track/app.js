/* =========================
   GLOBAL DATA
========================= */
let total_income = 40000;
let expenses = [];

document.getElementById("total_income").innerHTML = total_income;

/* =========================
   ADD EXPENSE (called from onclick)
========================= */



function addExpense() {
  event.preventDefault(); // prevent form reload

  const date = document.getElementById("expenseDate").value;
  const category = document.getElementById("expenseCategory").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const note = document.getElementById("expenseNote").value;
  if (!date || !category || !amount) {
    alert("Please fill Date, Category, and Amount");
    return;
  }

  const expense = { 
            "date" : date ,
            "category" : category, 
            "amount" : amount,
            "note":  note 
           };
  khoros = expenses.push(expense);
  let total_expense = expenses.reduce((sum,expense) => sum + expense.amount,0);
  document.getElementById("total_expense").innerHTML=total_expense;
  console.log(expenses);
  appendExpenseRow(expense);
  clearExpenseForm();
}

/* =========================
   APPEND ROW TO TABLE
========================= */
function appendExpenseRow(expense) {
  const table = document.getElementById("expanseTable").querySelector("tbody");

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${expense.date}</td>
    <td>${expense.category}</td>
    <td>${expense.note || "-"}</td>
    <td class="text-end text-danger">৳ ${expense.amount}</td>
    <td class="text-center">
       <button class="btn btn-sm btn-outline-primary">
                <i class="bi bi-pencil"></i>
              </button>
      <button class="btn btn-sm btn-outline-danger"> 
        <i class="bi bi-trash"></i>
      </button>
    </td>
  `;

  table.appendChild(row);
}
// 

/* =========================
   CLEAR FORM
========================= */
function clearExpenseForm() {
  document.getElementById("expenseDate").value = "";
  document.getElementById("expenseCategory").selectedIndex = 0;
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseNote").value = "";
}

/* =========================
   DATE RANGE FILTER
========================= */
document.querySelectorAll("form")[0].addEventListener("submit", function (e) {
  e.preventDefault();

  const fromDate = document.getElementById("formDate").value;
  const toDate = document.getElementById("toDate").value;

  if (!fromDate || !toDate) {
    alert("Please select both From and To dates");
    return;
  }

  if (fromDate > toDate) {
    alert("From date cannot be greater than To date");
    return;
  }

  filterTableByDate(fromDate, toDate);
});

/* =========================
   FILTER TABLE ROWS
========================= */
function filterTableByDate(fromDate, toDate) {
  const rows = document
    .getElementById("expanseTable")
    .querySelectorAll("tbody tr");

  let total = 0;

  rows.forEach(row => {
    const rowDate = row.children[0].innerText;

    if (rowDate >= fromDate && rowDate <= toDate) {
      row.style.display = "";
      const amountText = row.children[3].innerText.replace("৳", "").trim();
      total += parseFloat(amountText);
    } else {
      row.style.display = "none";
    }
  });

  alert("Total Expense for Selected Range: ৳ " + total);
}
