//basic arithmetic functions
const add = (a,b) => (a + b);
const subtract = (a,b) => (a - b);
const multiply = (a,b) => (a * b);
const divide = (a,b) => (a / b);
const power = (a,b) => (a ** b);

let numOne = 'start';
let numTwo = 'start';
let currentNum = [];
let prevButton = 'start';
let currentButton = 'start';
let operation = 'start';

//function to be called after two operands and an operation are selected
function operator(numOne, operation, numTwo) {
    let result = 0;

    switch(operation) {
        case 'op-add':
            result = add(numOne, numTwo);
            break;
        case 'op-subtract':
            result = subtract(numOne, numTwo);
            break;
        case 'op-multiply':
            result = multiply(numOne, numTwo);
            break;
        case 'op-divide':
            result = divide(numOne, numTwo);
            break;
        case 'op-power':
            result = power(numOne, numTwo);
            break;
        case 'op-equals':
            result = power(numOne, numTwo);
            break;
    }

    console.log(result);
    return result;
    
}

const screenText = document.querySelector('.screen-text')
const buttons = document.querySelectorAll('.btn')

buttons.forEach((button)=> button.addEventListener('click', (e)=> {
    checkInput(e.target.id);
}));

function checkInput (id) {
    //if prev button was num and current button is num, still adjusting num
    //if current button is equals, and n

    prevButton = currentButton;
    currentButton = id;

    //if currentbutton is a number and previous button was a number and operand is still being entered

    //if current button is a num and numone, numtwo, and operand exist we are still making numtwo
    //if current button is a num and numone, and operand exist we are still makking numtwo
    //if current button is a num and numone, exists but not operand we are making numone
    //if current button is an operand and numone exists, but not numtwo
    if(id === 'clear') {
        numOne = [];
        numTwo = [];
        operation = 'start';
    }
    //if current button is number and previous button is number or blank then an operand is still being entered
    if(id.match(/[0-9]/)) {
        currentNum.push(+id);
        console.log(currentNum);
    //if current button is number and previous button was not then a new number is being entered
    } 
    
    if (id.match(/op*/)) {
        console.log('operator');
        numTwo = currentNum.join('');
        currentNum = [];

        if (numOne !== 'start' && numTwo !== 'start'){
            let answer = operator(+numOne, operation, +numTwo);
            screenText.textContent = answer
            numOne = answer;
            numTwo = 'start';
            operation = id;
            return;
        }
        operation = id;
        numOne = numTwo;
        numTwo = 'start';
    }
    
 

    //num op num op num op
    //num1 op num2 op (num2 becomes num1) num2 op (num2 becomes num1)

   
}