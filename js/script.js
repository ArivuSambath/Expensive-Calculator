document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");
  const filterCategory = document.getElementById("filter-category");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const category = document.getElementById("expense-category").value;
    const date = document.getElementById("expense-date").value;

    const expense = {
      id: Date.now(),
      name,
      amount,
      category,
      date,
    };

    expenses.push(expense);
    displayExpenses(expenses);
    updateTotalAmount();
    updateLocalStorage();

    expenseForm.reset();
  });

  expenseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = parseInt(e.target.dataset.id);
      expenses = expenses.filter((expense) => expense.id !== id);
      displayExpenses(expenses);
      updateTotalAmount();
      updateLocalStorage();
    }

    if (e.target.classList.contains("edit-btn")) {
      const id = parseInt(e.target.dataset.id);
      const expense = expenses.find((expense) => expense.id === id);

      document.getElementById("expense-name").value = expense.name;
      document.getElementById("expense-amount").value = expense.amount;
      document.getElementById("expense-category").value = expense.category;
      document.getElementById("expense-date").value = expense.date;

      expenses = expenses.filter((expense) => expense.id !== id);
      displayExpenses(expenses);
      updateTotalAmount();
      updateLocalStorage();
    }
  });

  filterCategory.addEventListener("change", (e) => {
    const category = e.target.value;
    if (category === "All") {
      displayExpenses(expenses);
    } else {
      const filteredExpenses = expenses.filter(
        (expense) => expense.category === category
      );
      displayExpenses(filteredExpenses);
    }
  });

  function displayExpenses(expenses) {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const row = document.createElement("tr");


      const formattedAmount = isNaN(expense.amount) ? "0.00" : expense.amount.toFixed(2);

      row.innerHTML = `
      
                <td class="border border-gray-300 p-2">${expense.name}</td>
                <td class="border border-gray-300 p-2">$${formattedAmount}</td>
                <td class="border border-gray-300 p-2">${expense.category}</td>
                <td class="border border-gray-300 p-2">${expense.date}</td>
                <td class="border border-gray-300 p-2">
                    <button class="edit-btn bg-blue-500 text-white p-1 rounded" data-id="${
                      expense.id
                    }">Edit</button>
                    <button class="delete-btn bg-red-500 text-white p-1 rounded" data-id="${
                      expense.id
                    }">Delete</button>
                </td>
            `;

      expenseList.appendChild(row);
    });
  }

  function updateTotalAmount() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
  }

  function updateLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // Initial display of expenses
  displayExpenses(expenses);
  updateTotalAmount();
});
