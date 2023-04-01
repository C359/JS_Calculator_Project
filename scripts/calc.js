
//basic arithmetic functions
const add = (a,b) => (a + b);

const subtract = (a,b) => (a - b);

const multiply = (a,b) => (a * b);

const divide = (a,b) => (a / b);

const power = (a,b) => (a ** b);


let numOne = 0;
let numTwo = 0;
let operation = '';

//function to be called after two operands and an operation are selected
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
    numOne = result;
    return result;
    
}

const buttons = document.querySelectorAll('.btn')

buttons.forEach((button)=> button.addEventListener('click', (e)=> {
    console.log(e.target);
}));

