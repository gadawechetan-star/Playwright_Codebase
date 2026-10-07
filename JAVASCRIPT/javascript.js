/*let marks = [85, 90, 78, 92, 88];
let sum = 0;
for (let value of marks) {
    sum+= value;
}
let average = sum / marks.length;
console.log("Average marks:", average); 
*/

//let fooditems = ["Pizza", "Burger", "Pasta", "Salad", "Sushi"];
//let fooditems.push("Tacos");
//console.log("Food items:", fooditems);
//let fooditems=fooditems.pop();

//let companies = ["Google", "Apple", "Microsoft", "Amazon", "Facebook"];
//console.log("Companies:", companies);
//companies.splice(2,1, "Tesla", "Netflix");
//console.log("Updated Companies:", companies);

/*
function Calculator() {
  let num1 = prompt("Enter the first number:");
  let num2 = prompt("Enter the second number:");
  let operation = prompt("What operation do you want to perform? (+, -, *, /)");
  if (operation === "+") {
    console.log("Sum:", parseInt(num1) + parseInt(num2));
  }
else if (operation === "-") {
    console.log("Difference:", parseInt(num1) - parseInt(num2));
  }else if (operation === "*") {
    console.log("Product:", parseInt(num1) * parseInt(num2));
  }else if (operation === "/") {
    console.log("Quotient:", parseInt(num1) / parseInt(num2));
  }
}
Calculator()
*/

/*function Vowel_Counter() {
  let inputString = prompt("Enter a string:");
  let vowelCount = 0;
  let vowels = "aeiouAEIOU";
  for (let i = 0; i < inputString.length; i++) {
    if (vowels.includes(inputString[i])) {
      vowelCount++;
    }
  }
  console.log("Number of vowels:", vowelCount);
}
Vowel_Counter();
*/
/*
let marks = [85, 90, 78, 92, 88];
let ninty = marks.filter(function(value) {
    return value >= 90;
});
console.log("Marks greater than or equal to 90:", ninty);
*/

let numbers = prompt("Enter number of elements in array:");
let arr = [];
for (let i = 1; i <= numbers; i++) {
    arr[i-1] = i;
}
console.log("Array elements:", arr);

let sum = arr.reduce(function(accumulator, currentValue) {
    return accumulator * currentValue;
}, 1);
console.log("Product of array elements:", sum); 