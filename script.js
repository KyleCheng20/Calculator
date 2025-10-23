let btnsContainer = document.querySelector('.buttons-container');
let inputDisplay = document.querySelector('.input-display');
let equalsBtn = document.querySelector('.equals-btn');

let operator = null;
let operand1 = null;
let operand2 = null;
let justEvaluated = false;
let lastOperand = null;
let lastOperator = null;

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
        let result = operate(operator, operand1, operand2);
        inputDisplay.textContent = result;
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
    }
});

//next feat: 10 + 10  = 20, then - 5 = 15, then the next button i press is an 
//operator like + followed by an "=" button it should now start adding by 15 after
//every "=" button 