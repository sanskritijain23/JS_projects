document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculatetotal();

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name !== '' && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            }
            expenses.push(newExpense);
            saveExpensesToLocal();

            renderExpenses();
            updateTotal();

            expenseNameInput.value = '';
            expenseAmountInput.value = '';

        }
    });

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    function calculatetotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function saveExpensesToLocal() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function updateTotal(){
        totalAmount = calculatetotal();
        totalAmountDisplay.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
    }
    
    expenseList.addEventListener('click', function(event) {
        if(event.target.tagName === 'BUTTON') {
            const expenseId = parseInt(event.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== expenseId);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();
        }
    });
})