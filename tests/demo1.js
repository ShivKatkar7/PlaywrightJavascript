"use strict";
let message1 = 'Hello'; //declare variable with type
console.log(message1);
let age = 23;
console.log(age);
let isActive = true;
console.log(isActive);
let numarray = [10, 20, 30]; //array
let data = "this could be any data type"; //if you don't know what data type to give then use this
//how to declare functions in typescript
function add(a, b) {
    return a + b;
}
//how to call function
console.log(add(3, 4)); //-> this will work
//add(3, "5"); //-> this will not work as other parameter passed is string but assigned data type is number
//objects in TS
let user = {
    name: "shivani",
    age: 25
};
//how to add new property in object
// user.location = "canada"; // -> this will not work here but will work in JS
// in TS
let user1 = {
    name: "shivani",
    age: 25,
    location: "canada"
};
