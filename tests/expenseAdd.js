let expenses = [100, 200, 300, 400, 500];

console.log('Original Expenses:', expenses);

const totalExpenses = expenses.reduce((total, expense) => total + expense, 0);
console.log('Total Expenses:', totalExpenses);

const highestExpense = expenses.reduce((max, expense) => (expense > max ? expense : max), expenses[0]);

console.log('Highest Expense:', highestExpense);


let studentNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
console.log('Original Student Names:', studentNames);

studentNames.push('Frank');
console.log('After Adding Frank:', studentNames);


let productPrices = [100, 300, 600, 40, 600, 80]

console.log("Origional Prices : ", productPrices);

const newPrices = productPrices.map(function(num){
    
    return num * 0.9 ; 
})

console.log("New Prices After 10% discount : ", newPrices);

const affordableProductPrice = productPrices.filter(function(num){
    return num < 50;
});

console.log("affordable Product Prices :", affordableProductPrice );

const affordableProductPricetotal = productPrices.reduce((total, affordableProductPrice) => (total+affordableProductPrice), 0);

console.log(affordableProductPricetotal);