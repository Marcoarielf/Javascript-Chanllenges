'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Marco Filetto',
<<<<<<< HEAD
  movements: [1130, 450, -400, 3424, -650, -130, 7230, 820],
=======
  movements: [100000, 450, 400, 24, -650, 630, 70, 80],
>>>>>>> 8e033b56863f6db1864661ede6fdd818d610116a
  interestRate: 1.2, // %
  pin: 1111,

  movementDates: [
    '2020-02-18T21:31:17.178Z', 
    '2020-03-18T15:31:17.178Z', 
    '2020-03-18T22:31:12.178Z', 
    '2021-05-18T05:12:16.178Z', 
    '2021-02-18T22:25:13.178Z', 
    '2021-06-18T06:21:12.178Z', 
    '2021-06-23T05:11:17.178Z', 
    '2021-06-24T21:21:19.178Z', 
  ],
  locale: 'es-AR'
};

const account2 = {
  owner: 'Test Usser',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementDates: [
    '2020-02-18T21:31:17.178Z', 
    '2020-03-18T15:31:17.178Z', 
    '2020-03-18T22:31:12.178Z', 
    '2021-05-18T05:12:16.178Z', 
    '2021-02-18T22:25:13.178Z', 
    '2021-06-18T06:21:12.178Z', 
    '2021-06-18T05:11:17.178Z', 
    '2021-06-18T21:21:19.178Z', 
  ],

  locale: 'pt-PT'
};

const account3 = {
  owner: 'Elon Musk',
  movements: [2000, -1200, 3240, 3000, -230, 5340, 4030, -460],
  interestRate: 0.7,
  pin: 3333,
  movementDates: [
    '2020-02-18T21:31:17.178Z', 
    '2020-03-18T15:31:17.178Z', 
    '2020-03-18T22:31:12.178Z', 
    '2021-05-18T05:12:16.178Z', 
    '2021-02-18T22:25:13.178Z', 
    '2021-06-18T06:21:12.178Z', 
    '2021-06-18T05:11:17.178Z', 
    '2021-06-18T21:21:19.178Z', 
  ],

  locale: 'en-US'
};

const account4 = {
  owner: 'CZ Binance',
  movements: [43320, 10030, 7300, 5320, 903],
  interestRate: 1,
  pin: 4444,
  movementDates: [
    '2020-02-18T21:31:17.178Z', 
    '2020-03-18T15:31:17.178Z', 
    '2020-03-18T22:31:12.178Z', 
    '2021-05-18T05:12:16.178Z', 
    '2021-02-18T22:25:13.178Z', 
  ]
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

const formatMovementDate = function(movementDate, locale){
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date2-date1) / (1000 * 60 * 60 *24)));

  const daysPassed = calcDaysPassed(new Date(), movementDate);
  console.log(daysPassed);

  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <= 7) return `${daysPassed} days ago`;


    // const year = movementDate.getFullYear();
    // const month = `${movementDate.getMonth() + 1}`.padStart(2,'0')
    // const day = `${movementDate.getDate()}`.padStart(2,'0');
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(movementDate);

  

  
}

const btcPrice = 50000;

const displayMovements = function(acc, sort = false){
  containerMovements.textContent = '';
  // slice me crea una copia del array. Lo puedo usar así para no mutar el original
  const movs = sort ? acc.movements.slice().sort((a,b) => a-b) : acc.movements;

  movs.forEach(function(movement, index){

    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const movementDate = new Date(acc.movementDates[index]);
    const displayDate = formatMovementDate(movementDate, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${(movement/btcPrice).toFixed(6)} &#8383;</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html)

  })
}

const displayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, curr) => acc += curr, 0);
  labelBalance.textContent = `${(acc.balance/btcPrice).toFixed(2) } BTC`
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

  labelSumIn.textContent = `${(incomes/btcPrice).toFixed(2)}BTC`;
  labelSumOut.textContent = `${Math.abs(outcomes/btcPrice.toFixed(2))}BTC`;
  labelSumInterest.textContent = `${interesest/btcPrice.toFixed(2)}BTC`;

}

const updateUI = function (acc){
  // display movements
  displayMovements(acc);
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

const startLogOutTimer = function(){
  const tick = function(){
    // I've converted min and sec to string because I used padStart to generate '0' in cases number it's only one.
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    // in each callback call, print the remaning call to the user interface
    labelTimer.textContent = `${min}:${sec}`;
    //when the time is 0, stop Timer and log out usser.
    if(time === 0) {
      clearInterval(timer);
      // Display UI and welcome message
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    --time;
  }
  // set time to 5 minutes
  let time = 60;
  //call the timer every second to update countdown
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

createUserNames(accounts);
console.log(accounts);

// event handlers
let currentAccount, timer;

//FAKE always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

document.addEventListener('click', function(){
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnLogin.addEventListener('click',function(e){
  e.preventDefault();

  currentAccount = accounts.find( acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    //creating current DATE
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    }
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(now);

    //clear fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);

    if(timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
})

//loans
btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

    //loans is provided by the bank if the account has any movement with at least 10% of the loan.
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount/10 )){

    // setTimeOut to simulate delay banking
    setTimeout(function(){
      // add movement
      currentAccount.movements.push(amount);

      // add LOAN date
      currentAccount.movementDates.push(new Date().toISOString());

      inputLoanAmount.value = '';
      updateUI(currentAccount);
    },2000);
    
  }
})

// delete account
btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value == currentAccount.username && +(inputClosePin.value) === currentAccount.pin){
    
    const index = accounts.findIndex( acc => acc.username === currentAccount.username);
    accounts.splice(index, 1);

    //hide UI
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  }
})

// SORT
let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

const withdrawals = movements.filter( mov => mov < 0);
console.log(withdrawals);

//TRANSFERS
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  
  

  if(amount > 0 && amount <= currentAccount.balance && receiverAccount && receiverAccount?.username !== currentAccount.username){
    
    setTimeout(function(){
    inputTransferAmount.value = inputTransferTo.value = '';
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // add transfer date
    currentAccount.movementDates.push(new Date().toISOString());
    receiverAccount.movementDates.push(new Date().toISOString());

    updateUI(currentAccount);
    }, 2000);
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

// movements.sort((a,b) => a-b);
// console.log('ordernados' + movements);

// Creating arrays

const arr = Array.from({length: 100}, () => Math.floor(Math.random() * 100));
console.log(arr);

/*

Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
Your tasks:
1. Loopoverthe'dogs'arraycontainingdogobjects,andforeachdog,calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. FindSarah'sdogandlogtotheconsolewhetherit'seatingtoomuchortoo little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Createanarraycontainingallownersofdogswhoeattoomuch ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Logastringtotheconsoleforeacharraycreatedin3.,likethis:"Matildaand Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Logtotheconsolewhetherthereisanydogeatingexactlytheamountoffood that is recommended (just true or false)
6. Logtotheconsolewhetherthereisanydogeatinganokayamountoffood (just true or false)
7. Createanarraycontainingthedogsthatareeatinganokayamountoffood(try to reuse the condition used in 6.)
8. Createashallowcopyofthe'dogs'arrayandsortitbyrecommendedfood portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)
    The Complete JavaScript Course 25
Hints:
§ Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

  const recommendedFood = (weight => weight ** 0.75 * 28);
  const eatingToo = ( (currFood, weight) => {
    if(currFood > recommendedFood(weight) * 1.1){
      return 'much';
    }else if(currFood < recommendedFood(weight) * 0.9){
      return 'little'
    }else{
      return false;
    }
  });
  const eatingTooLittle = ( (currFood, weight) => currFood < recommendedFood(weight) * 0.9 ? true : false);
  const eatingTooMuch = ( (currFood, weight) => currFood > recommendedFood(weight) * 1.1 ? true : false);

  const calculateRecommendedFood = function(dogs){
    dogs.forEach(dog => dog.recFood = Math.trunc(recommendedFood(dog.weight)));
    return dogs.recFood;
  }
  calculateRecommendedFood(dogs);
  console.log(dogs);

 // sarah's dog
  const sarahsdog = dogs
  .find(obj => obj.owners.includes('Sarah'));

  console.log(sarahsdog);
  console.log(`${sarahsdog.owners[0]}'s dog eating too ${eatingToo(sarahsdog.curFood,sarahsdog.weight)}`);

  //3
const ownersEatTooLittle = dogs
  .filter(dog => eatingTooLittle(dog.curFood, dog.weight) ? dog.owners : '')
  .flatMap(dog => dog.owners);
const ownersEatTooMuch = dogs
  .filter(dog => eatingTooMuch(dog.curFood, dog.weight) ? dog.owners : '')
  .flatMap(dog => dog.owners);
console.log(`Owners whos dogs eat too Much: ${ownersEatTooMuch}`);
console.log(`Owners whos dogs eat too Little: ${ownersEatTooLittle}`);

//4
const nameStrings = (names => names.join().replaceAll(',',' and '));
console.log(`${nameStrings(ownersEatTooLittle)}'s dogs eat too little!`);
console.log(`${nameStrings(ownersEatTooMuch)}'s dogs eat too much!`);

//5
/* 
- Tengo que recorrer el array de dogs.
- preguntar si currFood === recFood;
*/
// no hace falta un map porque some recorre el array buscando esta condición.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6
console.log(dogs.some(dog => eatingToo(dog.curFood,dog.weight) == false));

// 7
// const dogsEatingOK = Array.from(4, dogs => (eatingToo(dogs.curFood,dogs.weight) == false) ? dogs : '');
// console.log(dogsEatingOK);

const dogsEatingOK = dogs.filter(dog => (eatingToo(dog.curFood,dog.weight) == false));
console.log('eating ok: ' + dogsEatingOK);

//8
// - crear una copia de dog array.
// - sort it by recFood in ascending order.
const shallowDogs = dogs.slice().sort((a,b) => a.recFood - b.recFood); 
console.log(shallowDogs);