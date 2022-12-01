const displayCurrent = document.querySelector('.display-current');
const displayPrevious = document.querySelector('.display-previous');
const buttonControl = document.querySelectorAll('[data-control]');
var currentOperation = '';

buttonControl.forEach( (element) => {
    element.addEventListener('click', (event) => {
        const keyValue = event.target.dataset.control;
        
        // Verifica se 'keyValue' é um número ou um '.'
        if (parseFloat(keyValue) >= 0 || keyValue === '.') {
            addDigit(keyValue)
        } else {
            operations(keyValue)
        }
    });
});

function addDigit(digit) {

    // Verificação que impede adicionar mais de 1 ponto '.'
    if (digit === '.' && displayCurrent.innerText.includes('.') ) {
        return;
    }

    currentOperation = digit;
    updateDisplay()
}

function operations(operation) {

    // Checar o valor atual está vazio e o operador for diferente de C (para poder apagar tudo)
    if (displayCurrent.innerText === '' && operation !== 'C') {
        // Verificar se há números no displayPrevious para poder mudar o operador 
        if (displayPrevious.innerText !== '') {
            changeOperation(operation);
        }
        return;
    }
    
    let operationValue;
    const previous =+ displayPrevious.innerText.split(' ')[0];
    const current =+ displayCurrent.innerText;

    switch (operation) {
        case '+':
            operationValue = previous + current
            updateDisplay(operationValue, operation, current, previous)
            break;
        case '-':
            operationValue = previous - current
            updateDisplay(operationValue, operation, current, previous)
            break;
        case '/':
            operationValue = previous / current
            updateDisplay(operationValue, operation, current, previous)
            break;
        case '*':
            operationValue = previous * current
            updateDisplay(operationValue, operation, current, previous)
            break;
        case 'C':
            deletaAll();
            break;
        case '<':
            deleteLastNumber();
            break;
        case '=':
            operationEqual();
            break;
        default:
            return;
    }
}

function updateDisplay(operationValue = null, operation = null, current = null, previous = null) {
    
    if(operationValue === null) {
        displayCurrent.innerText += currentOperation;
    } else {
        // Checagem para a primeira operação quando previous for vazio
        if (previous === 0) {
            operationValue = current;
        }

        displayPrevious.innerText = `${operationValue} ${operation}`;
        displayCurrent.innerText = '';
    }
}

function changeOperation(operation) {

    // Operações matemáticas que estamos utilizando na calculadora
    const mathOperations = ['+', '-', '*', '/']

    // Verificar se 'operation' é uma operação matemática
    if (!mathOperations.includes(operation)) {
        return;
    }

    // Remove o último caracter (+,-,/,*) e adiciona o 'operation' clicado
    displayPrevious.innerText = displayPrevious.innerText.slice(0, -1) + operation;

}

function deletaAll() {
    displayCurrent.innerText = '';
    displayPrevious.innerText = '';
}

function deleteLastNumber() {
    displayCurrent.innerText = displayCurrent.innerText.substring(0, displayCurrent.innerText.length -1);
}

function operationEqual() {
    // Coleta o operador que está no previous
    const operation = displayPrevious.innerText.split(' ')[1];
    operations(operation);
}

// Mudando o tema (dark/light)
const changeTheme = document.querySelector('.change-theme');

changeTheme.onclick = function () {
    document.body.classList.toggle('dark');
    
}