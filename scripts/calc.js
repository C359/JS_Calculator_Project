//basic arithmetic functions
const add = (a,b) => (a + b);
const subtract = (a,b) => (a - b);
const multiply = (a,b) => (a * b);
const divide = (a,b) => (a / b);
const power = (a,b) => (a ** b);

let numOne = 'start';
let numTwo = 'start';
let currentNum = [];
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
    }
    //display result
    screenText.textContent = roundNumbers(result);
    return result;

}

const screenText = document.querySelector('.screen-text')
const buttons = document.querySelectorAll('.btn')

buttons.forEach((button)=> button.addEventListener('click', (e)=> {
    checkInput(e.target.id);
}));

function checkInput (id) {

    if (id === 'clear') {
        numOne = 'start';
        numTwo = 'start';
        operation = 'start';
        currentNum = [];
        screenText.textContent = 0;
    }
    else if (id.match(/[0-9]/)) {
        currentNum.push(+id);
        screenText.textContent = roundNumbers(currentNum.join(''));
        return;
    } 
    else if (id === 'dot' && !(currentNum.includes('.'))) {
        currentNum.push('.');
        screenText.textContent = roundNumbers(currentNum.join(''));
        return;
    } 
    else if (id.match(/op*/) && numOne === 'start') {
        numOne = currentNum.join('');
        currentNum = [];
        console.log(numOne, operation, numTwo);

    } 
    else if (id.match(/op*/) && numTwo === 'start' && operation !== 'start') {
        numTwo = currentNum.join('');
        currentNum = [];
        console.log(numOne, operation, numTwo);
    }

    if (numOne !== 'start' && numTwo !== 'start' && id.match(/op*/)) {
        let answer = operator(+numOne, operation, +numTwo);
        numOne = answer;
        numTwo = 'start';
        id === 'op-equals' ? operation = 'start': operation = id;
        return;
    } 
    operation = id;
}

function roundNumbers(testNumber) {
    if (testNumber == Math.floor(testNumber)){
        return testNumber;
    }
    
    let decPlaces = testNumber.toString().split(".")[1].length;
    decPlaces > 5? decPlaces = 5 : 'nothing';
    let roundingConversion = `1e${decPlaces}`;
   
    return (Math.round(testNumber * roundingConversion) / roundingConversion);
}
