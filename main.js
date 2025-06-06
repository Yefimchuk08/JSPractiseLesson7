const CurrenceExchange = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";



async function convert() {
    const currency = document.getElementById("currency").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const direction = document.getElementById("direction").value;
    const result = document.getElementById("result");

    if (isNaN(amount) || amount <= 0) {
        result.textContent = "Please enter a valid amount";
        return;
    }

    try {
        const response = await fetch(CurrenceExchange);
        const data = await response.json();

        const currencyData = data.find(item => item.cc === currency);
        if (!currencyData) {
            result.textContent = "Currency not found";
            return;
        }

        const rate = currencyData.rate;
        let convertedAmount;

        if (direction === "To-UAH") {
            convertedAmount = amount * rate;
            result.textContent = ${amount} ${currency} = ${convertedAmount.toFixed(2)} UAH;
        } else if (direction === "From-UAH") {
            convertedAmount = amount / rate;
            result.textContent = ${amount} UAH = ${convertedAmount.toFixed(2)} ${currency};
        } else {
            result.textContent = "Invalid conversion direction.";
        }
    } catch (error) {
        console.error("Error fetching currency exchange data: " + error);
        result.textContent = "Error fetching currency exchange data.";
    }
}


async function loadCurrencies() {
    const currencySelect = document.getElementById("currency");
    try {
        const response = await fetch(CurrenceExchange);
        const data = await response.json();

        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.cc;          
            option.textContent = ${item.cc} - ${item.txt}; 
            currencySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading currencies:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadCurrencies);
