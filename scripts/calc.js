
//basic arithmetic functions
const add = (a,b) => (a + b);

const subtract = (a,b) => (a - b);

const multiply = (a,b) => (a * b);

const divide = (a,b) => (a / b);

const power = (a,b) => (a ** b);

//read in value, read in operator, read in value
//if any other operator is called or equals is pressed, then perform operation

let numOne = 22;
let numTwo = 10;
let operation = 'add';

function operator(numOne, operation, numTwo) {
    let result = 0;

    switch(operation) {
        case 'add':
            result = add(numOne, numTwo);
            break;
        case 'subtract':
            result = subtract(numOne, numTwo);
            break;
        case 'multiply':
            result = multiply(numOne, numTwo);
            break;
        case 'divide':
            result = divide(numOne, numTwo);
            break;
        case 'power':
            result = power(numOne, numTwo);
            break;
    }

    console.log(result);

}

