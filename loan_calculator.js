const form = document.getElementById('loanForm');
const loanAmount = document.getElementById('loanAmount');
const interestRate = document.getElementById('interestRate');
const loanTerm = document.getElementById('loanTerm');
const modal= document.getElementById('modal');
const resultBox = document.getElementById('resultBox');
const button = document.getElementById('calculateButton');
const closeButton = document.getElementById('close');


document.addEventListener('keydown', checkKey);
form.addEventListener('submit', handleSubmit);
closeButton.addEventListener('mousedown', closeModal)


function checkKey(event) {
    console.log(`pressed Key ${event.key}`);
    if(event.key === 'Enter') {
        event.preventDefault();
        handleSubmit(event);
    }

    return
}


function handleSubmit(event) {
    event.preventDefault();
    const data = getInputs();
    const isFormValid = checkForm(data);

    if(!isFormValid) {
        return
    }

    const result = calculatePayment(data)
    console.log(`result: ${result}`)
    form.reset();

    resultBox.textContent = `Monthly Payment: ${result}`;
    modal.style.display= 'flex';

}




function getInputs () {
    return {
        loanValue: Number(loanAmount.value.trim()),
        monthlyInterestRate: (Number(interestRate.value.trim()) / 100) / 12,
        loanTermMonths: Number(loanTerm.value.trim()) * 12,
    }
}

function checkForm(data) {
    
    console.log(`data: ${JSON.stringify(data, null, 2)}`)
    const { loanValue,  monthlyInterestRate,  loanTermMonths} = data;

    if(!loanValue || ! monthlyInterestRate || ! loanTermMonths) {
        console.log("Invalid Inputs");
        return false
    }
    return true

}

function calculatePayment (data) {

    console.log("calculating...")
    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    const { loanValue,  monthlyInterestRate, loanTermMonths} = data;


    const loanPower = Math.pow((1 + monthlyInterestRate), loanTermMonths);

    console.log(`loanPower ${loanPower}`)

    const dividend = loanValue * monthlyInterestRate * loanPower;

    const divisor = loanPower - 1;

    console.log(`equation: ${dividend}/${divisor}`) 

    return (dividend/divisor).toFixed(2);
}



function closeModal (event) {
    event.preventDefault();
    modal.style.display='none';
    resultBox.textContent='';
}