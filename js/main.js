// Значение из текстовых инпутов
const totalCost = document.getElementById('total-cost');
const anInitialFee = document.getElementById('an-initial-fee');
const creditTerm = document.getElementById('credit-term');

// Значения из range инпутов
const totalCostRange = document.getElementById('total-cost-range');
const anInitialFeeRange = document.getElementById('an-initial-fee-range');
const creditTermRange = document.getElementById('credit-term-range');

// Итоговые значения
const totalAmountOfCredit = document.getElementById('amount-of-credit');
const totalMonphlyPayment = document.getElementById('monphly-payment');
const totalRecommendedIncome = document.getElementById('recommended-income');

// Все range инпуты
const inputsRange = document.querySelectorAll('.input-range');

// Все кнопки с процентной ставкой
const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
  totalCost.value = totalCostRange.value;
  anInitialFee.value = anInitialFeeRange.value;
  creditTerm.value = creditTermRange.value;
}

assignValue();

const banks = [
  {
    name: 'alfa',
    precents: 8.7 
  },
  {
    name: 'sberbank',
    precents: 8.4
  },
  {
    name: 'pochta',
    precents: 7.9
  },
  {
    name: 'tinkoff',
    precents: 9.2
  }
];

let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
  bank.addEventListener('click', () => {
    for (let bankRemove of bankBtns) {
      bankRemove.classList.remove('active');
    }
    bank.classList.add('active');
    takeActiveBank(bank);
  })
}

const takeActiveBank = (currentActive) => {
  const dataAttrValue = currentActive.dataset.name; 
  const currentBank = banks.find( bank => bank.name === dataAttrValue );
  currentPrecent = currentBank.precents;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);
}

for (let input of inputsRange) {
  input.addEventListener('input', () => {
    assignValue();
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
  })
}

let calculation = (totalCost = 0, anInitialFee = 10000, creditTerm = 1) => {
  /*
    ЕП - Ежемесячный платеж
    РК - Размер кредита
    ПС - Процентная ставка
    КМ - Количество месяцев

    ЕП = (РК + (( (РК / 100) * ПС) / 12) * КМ) / КМ
  */

  let monphlyPayment; // Ежемесячный платеж
  let loanAmount = totalCost - anInitialFee; // Размер кредита
  let interestRate = currentPrecent; // Процентная ставка
  let numberOfYears = creditTerm // Количество лет
  let numberOfMonths = 12 * numberOfYears; // Количетсво месяцев

  monphlyPayment = (loanAmount + (((loanAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;

  const monphlyPaymentAround = Math.round(monphlyPayment);
  let recommendedIncomeResult = monphlyPaymentAround + ((monphlyPaymentAround / 100) * 35);
  if (monphlyPaymentAround < 0) {
    return false
  } else {
    totalAmountOfCredit.innerHTML = `${loanAmount} P`;
    totalMonphlyPayment.innerHTML = `${monphlyPaymentAround} P`;
    totalRecommendedIncome.innerHTML = `${recommendedIncomeResult} P`;
  }
}