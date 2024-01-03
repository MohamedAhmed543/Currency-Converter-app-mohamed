const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two= document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');


const rateEl = document.getElementById('rate');
  const swap = document.getElementById('swap');
  const modal = document.getElementById('myModal');
  const overlay = document.getElementById('overlay');
  const closeModalBtn = document.getElementById('closeModal');

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const amount_one = parseFloat (amountEl_one.value);

  if (isNaN (amount_one)){
    return;
  }

  if (currency_one === currency_two) {
    openModal();
    return;
  }

  fetch(`https://v6.exchangerate-api.com/v6/3f48e172eb3aaf40403a8deb/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}
// This was my attempt at using local storage to list out previous conversions 
//saveConversionToLocalStorage({
//    fromCurrency: currency_one,
//    toCurrency: currency_two,
//    amount: amount_one,
//    convertedAmount: convertedAmount,
//  });
//
//  // Update the conversion history on the UI
//  updateConversionHistory();
//
//function saveConversionToLocalStorage(conversion) {
//const conversions = JSON.parse(localStorage.getItem('conversions')) || [];
//conversions.push(conversion);
//localStorage.setItem('conversions', JSON.stringify(conversions));
//}
//
//function updateConversionHistory() {
//const conversions = JSON.parse(localStorage.getItem('conversions')) || [];
//const historyItems = conversions.map((conversion, index) => {
//return `<li key=${index}>${conversion.amount} ${conversion.fromCurrency} = ${conversion.convertedAmount} ${conversion.toCurrency}</li>`;
//});
//
//conversionHistoryList.innerHTML = historyItems.join('');
//}
//
//
// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

closeModalBtn.addEventListener('click', closeModal);


function openModal() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
  }  

  function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  }

calculate();