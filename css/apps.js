function computeLoan() {
    const amount = parseFloat(document.querySelector('#amount').value);
    const interest_rate = parseFloat(document.querySelector('#interest_rate').value);
    const months = parseInt(document.querySelector('#months').value, 10);

    const interest = (amount * (interest_rate * 0.01)) / months;
    let payment = ((amount / months) + interest).toFixed(2);
    
    // Format the payment amount with commas
    payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Use backticks for template literals
    document.querySelector('#payment').innerHTML = `monthly payment = ${payment}`;
}
