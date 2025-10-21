let btnsContainer = document.querySelector('.buttons-container');
let inputDisplay = document.querySelector('.input-display');
let equalsBtn = document.querySelector('.equals-btn');

let operator = null;
let operand1 = null;
let operand2 = null;

btnsContainer.addEventListener('click', (event) => {
    let target = event.target;
    let value = target.textContent;

    if(target.classList.contains('digit')){
        if(operator === null && inputDisplay.textContent === '0'){
            inputDisplay.textContent = value;
        }
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
    else if(target.classList.contains('operator')){
        operator = value;
        operand1 = Number(inputDisplay.textContent);
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
    let result = operate(operator, operand1, operand2);
    inputDisplay.textContent = result;
});