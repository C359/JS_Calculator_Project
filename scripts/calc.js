//basic arithmetic functions
const add = (a,b) => (a + b);
const subtract = (a,b) => (a - b);
const multiply = (a,b) => (a * b);
const divide = (a,b) => (a / b);
const power = (a,b) => (a ** b);


//variables for storing state
let numOne = 'start';
let numTwo = 'start';
let currentNum = [];
let operation = 'start';


//function to be called after two operands and an operation are selected
function operator(numOne, operation, numTwo) {

    let result = 0;

    //if attempting to divide by zero display message
    if (operation === 'op-divide' && numTwo === 0) {
        screenText.textContent = 'Impossible!';
        return result;
    } 

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
    
    setDisplay(result);

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
        return;
    }
    else if (id.match(/[0-9]/)) {
        currentNum.push(+id);
        setDisplay(currentNum.join(''));
        return;
    } 
    else if (id === 'dot') {
        if(!(currentNum.includes('.'))) {
            currentNum.push('.');
            setDisplay(currentNum.join(''));
        }
        return;  
    } 
    else if (id === 'neg') {
        if (numOne == 'start') {
            currentNum.unshift('-');
            setDisplay(currentNum.join(''));
            return;
        }
        else if(operation == 'start'){
            numOne *= -1;
            setDisplay(numOne)
            return;
        }
    } 
    else if (id.match(/op*/) && numOne === 'start') {
        numOne = currentNum.join('');
        currentNum = [];
    } 
    else if (id.match(/op*/) && numTwo === 'start' && operation !== 'start') {
        numTwo = currentNum.join('');
        currentNum = [];
    }

    if (numOne !== 'start' && numTwo !== 'start' && id.match(/op*/)) {
        let result = operator(+numOne, operation, +numTwo);
        numOne = result;
        numTwo = 'start';
        id === 'op-equals' ? operation = 'start': operation = id;
        return;
    } 
    operation = id;
}

function checkNumber(testNumber) {
    let numLength = testNumber.toString().length;

    if(numLength > 10) {
        return 'Text Limit';
    } 
    else if (!(testNumber.toString().includes('.')) || testNumber.toString()[numLength-1] == 0){
        return testNumber;
    }
    
    let decPoints = testNumber.toString().split(".")[1].length

    decPoints > 3? decPoints = 3 : 'nothing';
    let roundingConversion = `1e${decPoints}`;
   
    return (Math.round(testNumber * roundingConversion) / roundingConversion);
}

function setDisplay(numToDisplay){
    let displayText = checkNumber(numToDisplay);
    screenText.textContent = displayText;
}