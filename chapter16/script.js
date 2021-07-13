'use strict'

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function(data, className = ''){
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.nativeName}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${((data.population)/1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
      </div>
    </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}
   
// OLD Javascript to make AJAX apis
// const getCountryAndNeighbour = function(country) {

//   //AJAX CALL Country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', 'https://restcountries.eu/rest/v2/name/argentina');
//   request.send();

//   request.addEventListener('load', function(){
//     const [data] = JSON.parse(request.responseText);
//     console.log(data);

//     //render cuountry 1
//     renderCountry(data);

//     //Get neighbour couentry
//     const [neighbours] = data.borders;
//     if(!neighbours) return;
//     console.log(neighbours);

//     //AJAX CALL neighbour
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbours}`);
//     request2.send();

//     request2.addEventListener('load', function(){
//       const data2 = JSON.parse(request2.responseText);
//       console.log(data2);
  
//       //render cuountry 1
//       renderCountry(data2, 'neighbour');
//     });
//   })
// }
  
// getCountryAndNeighbour('Argentina');

// modern javascript

// const getJSON = function(url, errMsg = 'Something were wrong!'){
//   return fetch(url)
//     .then(response => {
//       console.log(response);

//       if(!response){
//         throw new Error(errMsg);
//       }
//       return response.json()
//     });
// }

// const getCountryData = function(country){
  //fetch devuelve una promise.
  // we need to read response so for that we can use .json() that is a method available for fetch requests.
  //response.json() also returns a promise, so we need to use .then again.
//   getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'country not found')
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbours = data[0].borders[0];
//       if(!neighbours) throw new Error('Neighbour not found');
//       return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbours}`, 'country not found');
//     })
//       .then( data => renderCountry(data, 'neighbour'))
//       .catch(err => console.log('errorr'));
// };

// btn.addEventListener('click', function(){
//   getCountryData('Argentina');
// })

// ****** CODING CHALLENGE 1 *******

/* 
  PART 1
1. Create a function'whereAmI'which takes as inputs a latitude value('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).
2. Do “reverse geocoding” of the provided coordinates.Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do not use the 'getJSON' function we created, that is cheating 😉
3. Once you have the data,take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: “You are in Berlin, Germany”
4. Chain a catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If youre load fast,you will get this error with code 403. This is an error with the request. Remember, fetch() does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message

PART 2
6. Now it's time to use the received data to render a country.So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors,just like we have done in the last lecture (you can even copy this code, no need to type the same code)
*/

const whereAmI = function(lat, lng){
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  .then(response => {
    if(!response){
      const newError = 'Error fetch';
      throw new Error(newError);
    }
    return response.json();
  })
  .then(data => {
    return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
    
  })
  .then(response => {
    console.log(response);

    if(!response){
      throw new Error('ups');
    }
    return response.json()
  })
  .then( data => renderCountry(data[0]))
  .catch(err => console.log(err))
}

whereAmI(52.508, 13.381);