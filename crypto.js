const currencyEl_crypto = document.getElementById('currency-crypto');
const amountEl_crypto = document.getElementById('amount-crypto');
const rateEl_crypto = document.getElementById('rate-crypto');
const fetchCryptoBtn = document.getElementById('fetch-crypto');

const apiKey = '6f9fdfa0e2325a6aaece77af270ef0f6a9179c524903c3b1bcf5dac1538e36e8';
const apiUrl = 'https://min-api.cryptocompare.com/documentation?api_key=6f9fdfa0e2325a6aaece77af270ef0f6a9179c524903c3b1bcf5dac1538e36e8';

function calculateCryptocurrencyRates() {
  const currency_crypto = currencyEl_crypto.value;

  fetch(`${apiUrl}?fsym=${currency_crypto}&tsyms=USD&api_key=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      const rate_crypto = data.USD;
      rateEl_crypto.innerText = `1 ${currency_crypto} = ${rate_crypto} USD`;

      const amount_crypto = parseFloat(amountEl_crypto.value);

        if (!isNaN(amount_crypto)) {
          amountEl_crypto.value = (amount_crypto * rate_crypto).toFixed(2);
        }
      });
    }

// Event Listeners for Cryptocurrencies
currencyEl_crypto.addEventListener('change', calculateCryptocurrencyRates);
amountEl_crypto.addEventListener('input', calculateCryptocurrencyRates);
fetchCryptoBtn.addEventListener('click', calculateCryptocurrencyRates);

calculateCryptocurrencyRates();



