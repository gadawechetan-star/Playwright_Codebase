const arr1 = [20, 003, 50, 37, 10, 5, 100, 1];
console.log(arr1);

let arr2 = [];
for (let i = 0; i < arr1.length; i++) {
    arr2.unshift(arr1[i]);
}

console.log(arr2);
console.log(arr2.sort((a, b) => a - b));

let person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    city: 'New York',
    fullname: function() {
        return this.firstName + ' ' + this.lastName;
    }
};
console.log(person.fullname());