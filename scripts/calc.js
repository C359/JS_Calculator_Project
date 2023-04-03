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

//variables for dom elements
const screenText = document.querySelector('.screen-text')
const buttons = document.querySelectorAll('.btn')

//call checkInput with the id of any clicked button
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


//validate the Number and perform any necessary conversiond before displaying
function checkNumber(testNumber) {
    let numLength = testNumber.toString().length;
    let intLength = testNumber.toString().split(".")[0].length

    /*screen can only hold 10 characters. If there are over 10 digits and 6 of them are before the decimal, 
    then rounding will not shorten and only the first 6 should be displayed followed by '...' */
    if(numLength > 10 & intLength > 6) {
        return (testNumber.toString().slice(0,6) + '...');
    } 
    //if the number does not include a decimal or ends with a zero it should not be converted and can be displayed as is
    else if (!(testNumber.toString().includes('.')) || testNumber.toString()[numLength-1] == 0){
        return testNumber;
    }
    
    let decPoints = testNumber.toString().split(".")[1].length

    //if more than three decimal points, round down to three decimal places and return
    decPoints > 3? decPoints = 3 : 'nothing';
    let roundingConversion = `1e${decPoints}`;
   
    return (Math.round(testNumber * roundingConversion) / roundingConversion);
}


//call checkNumber and display the output to the calculator screen
function setDisplay(numToDisplay){
    let displayText = checkNumber(numToDisplay);
    screenText.textContent = displayText;
}