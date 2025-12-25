/* =========================
   GLOBAL DATA
========================= */
let total_income = 40000;
let expenses = [];
let editIndex = null;

let total_earn = document.getElementById("total_income");
total_earn.innerHTML = total_income;

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
  expenses.push(expense);
  let total_expense = expenses.reduce((sum,expense) => sum + expense.amount,0);
  document.getElementById("total_expense").innerHTML=total_expense;
  document.getElementById("current_balance").innerHTML=Number(total_earn.textContent)-total_expense;

  appendExpenseRow(expense,expenses.length - 1);
  clearExpenseForm();
}

/* =========================
   APPEND ROW TO TABLE
========================= */
function appendExpenseRow(expense,index) {
  const table = document.getElementById("expanseTable").querySelector("tbody");
  const row = document.createElement("tr");
  row.setAttribute("data-index", index);
  row.innerHTML = `
    <td>${expense.date}</td>
    <td>${expense.category}</td>
    <td>${expense.note || "-"}</td>
    <td class="text-end text-danger">৳ ${expense.amount}</td>
    <td class="text-center">
       <button class="btn btn-sm btn-outline-primary" onclick="editExpense(${index})">
                <i class="bi bi-pencil"></i>
              </button>
      <button class="btn btn-sm btn-outline-danger" onclick="deleteExpense(${index})"> 
        <i  class="bi bi-trash"></i>
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

  editIndex = null;
  resetButtons();
}

// delete expense from table

function deleteExpense(index) {
  if (!confirm("Are you sure you want to delete this expense?")) return;

  expenses.splice(index, 1);
  renderTable();
}

// edit expense

function editExpense(index) {
  const expense = expenses[index];

  document.getElementById("expenseDate").value = expense.date;
  document.getElementById("expenseCategory").value = expense.category;
  document.getElementById("expenseAmount").value = expense.amount;
  document.getElementById("expenseNote").value = expense.note;

  // Remove old expense (will be added again after update)
  // expenses.splice(index, 1);
  editIndex = index;
  document.getElementById("saveBtn").classList.add("d-none");
  document.getElementById("updateBtn").classList.remove("d-none");
  renderTable();
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

function renderTable() {
  const tableBody = document
    .getElementById("expanseTable")
    .querySelector("tbody");
  tableBody.innerHTML = "";
  let total_expense = 0;
  expenses.forEach((expense, index) => {
    total_expense += expense.amount;
    appendExpenseRow(expense, index);
  });
  document.getElementById("total_expense").innerHTML = total_expense;
  document.getElementById("current_balance").innerHTML =
  Number(total_earn.textContent) - total_expense;
}

function updateExpense(event) {
  event.preventDefault();
  console.log(editIndex);

  if (editIndex === null) return;

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

  if (!expense) return;
  expenses[editIndex] = expense;
  editIndex = null;
  renderTable();
  clearExpenseForm();
  resetButtons();
}

function resetButtons() {
  document.getElementById("saveBtn").classList.remove("d-none");
  document.getElementById("updateBtn").classList.add("d-none");
}

