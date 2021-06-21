'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Marco Filetto',
  movements: [10, 450, -400, 24, -650, -130, 70, 80],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Test Usser',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Elon Musk',
  movements: [2000, -12200, 3240, -3000, -2230, 5340, 4030, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'CZ Binance',
  movements: [43320, 10030, 7300, 5320, 903],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort = false){

  const movs = sort ? movements.slice().sort((a,b) => a-b) : movements;

  movs.forEach(function(movement, index){

    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${movement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html)

  })
}

const displayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, curr) => acc += curr, 0);
  labelBalance.textContent = `${acc.balance} $`
}

// displaySummary
const summary = function(acc){
  const incomes = acc.movements
                  .filter(mov => mov >= 0)
                  .reduce((acc, current) => acc += current);
  
  const outcomes = acc.movements
                  .filter(mov => mov < 0)
                  .reduce((acc, current) => acc += current, 0);

  const interesest = acc.movements
                      .filter(mov => mov >= 0)
                      .map(value => (value * acc.interestRate) / 100)
                      .filter(mov => mov >= 1)
                      .reduce((acc, curr) => acc += curr);

  labelSumIn.textContent = `${incomes}BTC`;
  labelSumOut.textContent = `${Math.abs(outcomes)}BTC`;
  labelSumInterest.textContent = `${interesest}USD`;

}

const updateUI = function (acc){
  // display movements
  displayMovements(acc.movements);
  // display balances
  displayBalance(acc);
  //display summary
  summary(acc);
}

const owner = 'Marco Filetto';
const username = owner
  .toLowerCase()
  .split(' ')
  .map( name => name[0] )
  .join('');
console.log(username);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['BTC', 'Bitcoin'],
  ['BNB', 'BNB'],
  ['APE', 'BANANA'],
  ['CAKE', 'PANCAKE'],
  ['BREW', 'CAFE'],
  ['ETH', 'ETHEREUM'],
  ['ADA', 'CARDANO'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const btcToUSD = 1.1;

const movementsUSD = movements.map( movement => movement * btcToUSD);
console.log(movementsUSD);

// a la función le llega un array de objetos (accounts)
const createUserNames = function(accounts){
  //con el foreach itero el array (los objetos)
  accounts.forEach(function(account) {
    // account es un objeto. Defino una nueva propiedad para ese objeto (username)
    account.username = account.owner
    .toLowerCase()
    .split(' ')
    .map( name => name[0] )
    .join('');
  })
};

createUserNames(accounts);
console.log(accounts);

// event handlers
let currentAccount;

btnLogin.addEventListener('click',function(e){
  e.preventDefault();

  currentAccount = accounts.find( acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;
    //clear fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
})

//loans
btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

    //loans is provided by the bank if the account has any movement with at least 10% of the loan.
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount/10 )){
    // add movement
    currentAccount.movements.push(amount);
    inputLoanAmount.value = '';
    updateUI(currentAccount);
  }
})

// delete account
btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value == currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    
    const index = accounts.findIndex( acc => acc.username === currentAccount.username);
    accounts.splice(index, 1);

    //hide UI
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  }
})

btnSort.addEventListener('click',function(e){
  e.preventDefault();
  let sorted = false;
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

const withdrawals = movements.filter( mov => mov < 0);
console.log(withdrawals);

//TRANSFERS
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && amount <= currentAccount.balance && receiverAccount && receiverAccount?.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
})



/////////////////////////////////////////////////

// CHALLENGE 1
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.

Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/

// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 4];

// const checkDogs = function(arr1,arr2){
//   // skip cats
//   const dogsJuliaCorrect = arr1.slice(1,3);
//   const allDogs = [...dogsJuliaCorrect, ...arr2];

//   allDogs.forEach(function(dogAge, index, arr){
//     dogAge < 3 ? 
//     console.log(`Dog number ${index + 1} is still a puppy 🐶`) : 
//     console.log(`Dog number ${index + 1} is an adult, and is ${dogAge} years old`);
//   });
// }

// checkDogs(dogsJulia,dogsKate);


/////////////////////////////////////////////////

// CHALLENGE 2

/* 
  Your tasks:
  Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
  ages ('ages'), and does the following things in order:
  1. Calculate the dog age in human years using the following formula: if the dog is
  <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
  humanAge = 16 + dogAge * 4
  2. Exclude all dogs that are less than 18 human years old (which is the same as
  keeping dogs that are at least 18 years old)
  3. Calculate the average human age of all adult dogs (you should already know
  from other challenges how we calculate averages �)
  4. Run the function for both test datasets
  Test data:
  § Data 1: [5, 2, 4, 1, 15, 8, 3]
  § Data 2: [16, 6, 10, 5, 6, 1, 4]
*/

// const calcAverageHumanAge = function(ages) {
//   const humanAges = ages.map( age => age <= 2 ? 2 * age : 16 + age * 4);
//   const oldDogs = humanAges.filter(age => age >= 18);
//   const avgHumanAge = (oldDogs.reduce( (acc, current) => acc + current)) / oldDogs.length;
//   console.log('human ages: ' + humanAges);
//   console.log('Old dogs: ' + oldDogs);
//   console.log('Average human ages: ' + avgHumanAge);
// }

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

/////////////////////////////////////////////////

// CHALLENGE 3

/* 
  Your tasks:
  Rewrite calcAverageHumanAge with arrow functions and chaning methods.
  Test data:
  § Data 2: [16, 6, 10, 5, 6, 1, 4]
*/

// const calcAverageHumanAgeV2 = ages =>
//       ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//           .filter(age => age >= 18)
//           .reduce( (acc, curr, i, arr) => (acc += curr) / arr.length, 0);

// const avg1 = calcAverageHumanAgeV2([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAgeV2([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

// FLAT method
const overalBalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc,curr) => acc += curr, 0);
console.log(overalBalance);

// FLATMAP method
const overalBalance2 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc,curr) => acc += curr, 0);
console.log(overalBalance2);

// sorting arrays

// movements.sort((a,b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

// return 1 o 1 en realidad es un numero positivo o negativo
// no encesariamente tiene que ser 1 o -1
// por eso, podemos simplificar la función
// sabemos que si a es mayor que b, entonces a-b es positivo.
// y si b es mayor que a. entonces a-b es negativo, so..
// sort mutate the array.

movements.sort((a,b) => a-b);

console.log('ordernados' + movements);