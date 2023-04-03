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

//handle button input to build the state needed to execute expressions
function checkInput (id) {

    //if clear is pressed reset all state variables
    if (id === 'clear') {
        numOne = 'start';
        numTwo = 'start';
        operation = 'start';
        currentNum = [];
        screenText.textContent = 0;
        return;
    }
    //if 0-9 is pressed, then continue adding to the currentNum being entered
    else if (id.match(/[0-9]/)) {
        currentNum.push(+id);
        setDisplay(currentNum.join(''));
        return;
    } 
    //if '.' is pressed then check if the value contains a decimal, and if not add one
    else if (id === 'dot') {
        if(!(currentNum.includes('.'))) {
            currentNum.push('.');
            setDisplay(currentNum.join(''));
        }
        return;  
    } 
    //if '+/-' is pressed
    else if (id === 'op-negative') {

        /*if numOne is not yet initialized, or an operation is entered but numTwo 
        has not yet been initialized then the negative sign applies to a number still being entered*/
        if (numOne === 'start' || (operation !== 'start')) {
            currentNum.unshift('-');
            setDisplay(currentNum.join(''));
            return;
        }
        /*if numOne contains a value, but operation is not yet entered then negative 
        sign should apply to numOne that is stored ex: wanting to switch sign after pressing '='*/
        else if(numOne !== 'start' && operation === 'start'){
            numOne *= -1;
            setDisplay(numOne);
            return;
        }

    } 
    //if an operator is pressed and numOne is not initialized with a value, the currentNum can be assigned to it
    else if (id.match(/op*/) && numOne === 'start') {
        numOne = currentNum.join('');
        currentNum = [];
    } 
    //if an operator is pressed and numTow is not initialized, if an operator has already been entered, the currentNum can be assumed as numTwo
    else if (id.match(/op*/) && numTwo === 'start' && operation !== 'start') {
        numTwo = currentNum.join('');
        currentNum = [];
    }

    //check if two valid numbers and an operator have been entered
    if (numOne !== 'start' && numTwo !== 'start' && id.match(/op*/)) {
        let result = operator(+numOne, operation, +numTwo);
        //the result of the operation becomes the first operand for the next operation.
        numOne = result;
        numTwo = 'start';
        //if the button pressed was '=' then the operator will not be used for the next operation cycle. Another operator will need to be entered to overwrite 'start'.
        id === 'op-equals' ? operation = 'start': operation = id;
        return;
    } 

    //line only reached if operator was pressed, but cannot yet evaluate an expression. Store the operator for next evaluation.
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
    //if the number does not include a decimal, ends with a zero, or is only a negative sign, then it should not be converted and can be displayed as is
    else if (!(testNumber.toString().includes('.')) || testNumber.toString()[numLength-1] == 0 || testNumber.toString() === '-'){
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