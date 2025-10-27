let btnsContainer = document.querySelector('.buttons-container');
let inputDisplay = document.querySelector('.input-display');
let equalsBtn = document.querySelector('.equals-btn');
let ansDisplay = document.querySelector('.ans-display');

let operator = null;
let operand1 = null;
let operand2 = null;
let justEvaluated = false;
let lastOperand = null;
let lastOperator = null;
let ansValue = 0;

btnsContainer.addEventListener('click', (event) => {
    let target = event.target;
    let value = target.textContent;

    //handles if button pressed is a digit
    if(target.classList.contains('digit')){
        //if next pressed button is a digit after pressing '=', start new computation
        if(justEvaluated){
        inputDisplay.textContent = value;
        operand1 = null;
        operand2 = null;
        operator = null;
        justEvaluated = false;
        return;
        }
       
        if(operator === null && inputDisplay.textContent === '0' && operand1 === null){
            inputDisplay.textContent = value;
        }
        //handle getting second operand for chaining operations
        else if(operator !== null){
            if(operand2 === null){
                inputDisplay.textContent = '';
            }
            inputDisplay.textContent += value;
            operand2 = Number(inputDisplay.textContent);
        }
        else{
            inputDisplay.textContent += value;
        }
    }

    //handles if button pressed is an operator
    else if(target.classList.contains('operator')){
        //handles if the next button pressed is an operator after an '=' to allow for continuing operations with new operator
        if(justEvaluated){
            operator = value;
            justEvaluated = false;
            lastOperator = operator;
            lastOperand = operand1;
            return;
        }

        //handle chaining multiple operations like 2+5-1
        if(operator && operand2){
            operand1 = operate(operator, operand1, operand2);
            inputDisplay.textContent = operand1;
            operand2 = null;
        }
        else{
            operand1 = Number(inputDisplay.textContent);
        }
        operator = value;
        justEvaluated = false;
    }

    //handles the clear display
    else if(target.classList.contains('clr-btn')){
        operand1 = null;
        operand2 = null;
        operator = null;
        justEvaluated = false;
        lastOperand = null;
        lastOperator = null;
        inputDisplay.textContent = '0';
    }

    //toggles the sign of a number
    else if(target.classList.contains('sign-toggle-btn')){
        let displayResult = Number(inputDisplay.textContent);

        displayResult = -displayResult;
        inputDisplay.textContent = displayResult;

        if(operator === null){
            operand1 = displayResult;
        }
        else{
            operand2 = displayResult;
        }
    }

    //deletes 1 digit from the display
    else if(target.classList.contains('del-btn')){
        //do nothing if we try to press 'del' after '='
        if(justEvaluated){
            return;
        }

        let displayArr = inputDisplay.textContent.split('');
        displayArr.pop();
        let displayResult = Number(displayArr.join(''));
        inputDisplay.textContent = displayResult || '0';

        if(operator === null){
            operand1 = displayResult;
        }
        else{
            operand2 = displayResult;
        }
    }

    //stores previous calculation answer for later computations if needed
    else if(target.classList.contains('ans-btn')){
        if(operator === null){
            operand1 = ansValue;
            inputDisplay.textContent = operand1;
        }
        else{
            operand2 = ansValue;
            inputDisplay.textContent = operand2;
        }
    }

    else if(target.classList.contains('decimal-btn')){
        if(justEvaluated){
            inputDisplay.textContent = '0.';
            operand1 = null;
            operand2 = null;
            operator = null;
            justEvaluated = false;
        }

        if(operator === null){
            if(!inputDisplay.textContent.includes('.')){
                inputDisplay.textContent += '.';
                operand1 = Number(inputDisplay.textContent);
            }
        }
        else{
            if(operand2 === null){
                inputDisplay.textContent = '0.';
                operand2 = 0;
            }
            else if(!inputDisplay.textContent.includes('.')){
                inputDisplay.textContent += '.';
                operand2 = Number(inputDisplay.textContent);
            }
        }
    }
});


function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0){
        return 'Error: division by 0';
    }
    return a / b;
}

function operate(operator, operand1, operand2){
    switch(operator){
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case 'x':
            return multiply(operand1, operand2);
        case '➗':
            return divide(operand1, operand2);
    }
}

equalsBtn.addEventListener('click', () => {
    if(!justEvaluated){
        if(operand2 === null){      //allows for continuing operations after equals with a new operator
            operand2 = operand1;
        }
        let result = operate(operator, operand1, operand2);

        if(result === 'Error: division by 0'){
            inputDisplay.textContent = result;
            operand1 = null;
            operand2 = null;
            operator = null;
            justEvaluated = true;
            return;
        }
        inputDisplay.textContent = result;
        ansDisplay.textContent = `Ans = ${result}`;
        ansValue = result;
        lastOperand = operand2;
        lastOperator = operator;

        operand1 = result;
        operand2 = null;
        operator = null;
        justEvaluated = true;
    }
    
    //handles chaining with pressing '=' button multiple times
    else if(justEvaluated){
        operand1 = operate(lastOperator, operand1, lastOperand);
        inputDisplay.textContent = operand1;
        if(operand1 !== 'Error: division by 0'){
            ansDisplay.textContent = `Ans = ${operand1}`;
            ansValue = operand1;
        }
    }
});

//next fix: when division by zero and get error message, ans display should not save
//and display teh error message.

//next feat: allow keyboard support by allowing users to type digits on keyboard like 1, 2, etc