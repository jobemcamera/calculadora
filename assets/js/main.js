const displayResult = document.querySelector('.display-result');

const buttonValue = document.querySelectorAll('[data-control]');

buttonValue.forEach( (element) => {
    element.addEventListener('click', (event) => {
        const keyValue = event.target.dataset.control;
        displayUpdated(keyValue);
    });
});

function displayUpdated(keyValue) {
    if (keyValue == 'C') {
        displayResult.innerText = '';
    } else if (keyValue == '<') {
        displayResult.innerText = displayResult.innerText.substring(0, displayResult.innerText.length -1);
    } else {
        displayResult.innerText += keyValue;
    }
    
}
