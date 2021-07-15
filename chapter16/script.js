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

// const whereAmI = function(lat, lng){
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//   .then(response => {
//     if(!response){
//       const newError = 'Error fetch';
//       throw new Error(newError);
//     }
//     return response.json();
//   })
//   .then(data => {
//     return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
    
//   })
//   .then(response => {
//     console.log(response);

//     if(!response){
//       throw new Error('ups');
//     }
//     return response.json()
//   })
//   .then( data => renderCountry(data[0]))
//   .catch(err => console.log(err))
// }

// whereAmI(52.508, 13.381);

// console.log('event loop in practice');

// console.log('test start');
// setTimeout(() => console.log('set time out'), 0);
// Promise.resolve('resolved promise').then(res => console.log('resolved promise'));
// console.log('test finished');

// const lotteryPromise = new Promise(function(res, rej){
//   // encapsulates async behaviour into a promise
//   setTimeout(function(){
//     if(Math.random() >= 0.5){
//       res('¡You win!');
//     }else{
//       rej(new Error('you lose..'))
//     }
//   }, 2000)
// })

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))

// // like a fetch, wait function returns a promise
// const wait = function(seconds){
//   return new Promise(function(res){
//     setTimeout(res, seconds * 1000)
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second after') 
//     return wait(1)
//   })
//   .then(() => {
//     console.log('1 second after') 
//     return wait(1)
//   })
//   .then(() => {
//     console.log('1 second after') 
//     return wait(1)
//   })
//   .then(() => {
//     console.log('1 second after') 
//     return wait(1)
//   })



// const getPosition = function(){
//   return new Promise(function(res, rej){
//     navigator.geolocation.getCurrentPosition(
//       res,rej
//     );
//   })
// }

// const whereAmI = function(){
//   getPosition().then(pos => {
//     const {latitude: lat, longitude: lng} = pos.coords;
//     return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   })
//   .then(response => {
//     if(!response){
//       const newError = 'Error fetch';
//       throw new Error(newError);
//     }
//     return response.json();
//   })
//   .then(data => {
//     return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
    
//   })
//   .then(response => {
//     console.log(response);

//     if(!response){
//       throw new Error('ups');
//     }
//     return response.json()
//   })
//   .then( data => renderCountry(data[0]))
//   .catch(err => console.log(err))
//   }

//   btn.addEventListener('click', whereAmI);

/* 
 ****************************************
  Coding Challenge #2
  Your tasks:
  Tasks are not super-descriptive this time, so that you can figure out some stuff by yourself. Pretend you're working on your own 😉
  PART 1
  1. Create a function'createImage' which receives 'imgPath' as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path
  2. When the image is done loading,append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the'error' event), reject the promise
  PART 2
  4. Consume the promise using.then and also add an error handler
  5. After the image has loaded,pause execution for 2 seconds using the 'wait' function we created earlier
  6. After the 2 seconds have passed,hide the current image(setdisplayCSS
  property to 'none'), and load a second image (Hint: Use the image element returned by the 'createImage' promise to hide the current image. You will need a global variable for that 😉)
  7. After the second image has loaded,pause execution for 2 seconds again
  8. After the 2 seconds have passed,hide the current image
  Test data: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to “Fast 3G” in the dev tools Network tab, otherwise images load too fast
 ****************************************
*/

// const imgContainer = document.querySelector('.images');

// const wait = function(seconds){
//   return new Promise(function(res){
//     setTimeout(res, seconds * 1000)
//   });
// };

// function createImage(imgPath){
//   return new Promise(function(resolve,reject){
//     const el = document.createElement('img');
//     el.src = imgPath;

//     el.addEventListener('load', function(){
//       imgContainer.append(el)
//       resolve(el);
//     })

//     el.addEventListener('error', function(){
//       reject(new Error('Something went wrong'));
//     })
//   });
// }

// let currImage;

// createImage('img/image1.jpeg')
//   .then(img => {
//     currImage = img;
//     return wait(2);
//   })
//   .then(res => {
//     currImage.style.display = 'none';
//     return createImage('img/image2.jpeg')
//   })
//   .then(img => {
//     currImage = img;
//     return wait(2);
//   })
//   .then(res => {
//     currImage.style.display = 'none';
//   })
//   .catch(err => console.error(err))

  // ASYNC AWAIT

  // const getPosition = function(){
  //   return new Promise(function(res, rej){
  //     navigator.geolocation.getCurrentPosition(
  //       res,rej
  //     );
  //   })
  // }

  // const whereAmI = async function(){
  //   try{
  //     const pos = await getPosition();
  //     const {latitude: lat, longitude: lng} = pos.coords;
      
  //     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  //     if(!resGeo.ok) throw new Error('Problem getting the geolocation')
  //     const dataGeo = await resGeo.json()
  
  //     const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`)
  //     if(!res.ok) throw new Error('Problem getting the data')
  //     const data = await res.json();
      
  //     renderCountry(data[0]);

  //     return `You are in ${dataGeo.city}, ${dataGeo.country}`
  //   } catch(err) {
  //     console.error(err);
  //   }
    
  // }

  // console.log('1: Will get the location');
  // whereAmI()
  //   .then(city => console.log(`2: ${city}`))
  //   .catch(err => console.error(`2: ${err}`))
  //   .finally(() => console.log('3: Test end'))

  // (async function(){
  //   try{
  //     const city = await whereAmI()
  //     console.log(`2: ${city}`);
  //   } catch(err){
  //     console.error(`2: ${err}`)
  //   }
  //   console.log('3: test end');
    
  // })();

  // const getJSON = function(url, errMsg = 'Something were wrong!'){
  //   return fetch(url)
  //     .then(response => {

  //       if(!response){
  //         throw new Error(errMsg);
  //       }
  //       return response.json()
  //     });
  // }

  // const get3Countries = async function(c1,c2,c3){
  //   const data = await Promise.all([
  //     getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
  //     getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
  //     getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)
  //   ])
  //   console.log(data.map(country => country[0].capital));
  // }
  
  // get3Countries('Argentina','Paraguay','Bolivia')

  /* 
  
    Coding Challenge #3
    Your tasks:
    PART 1
    1. Write an async function'loadNPause' that recreates Challenge#2,this time using async/await (only the part where the promise is consumed, reuse the 'createImage' function from before)
    2. Compare the two versions,think about the big differences,and see which one you like more
    3. Don't forget to test the error handler,and to set the network speed to “Fast3G” in the dev tools Network tab
    PART 2
    1. Create an async function 'loadAll' that receives an array of image paths 'imgArr'
    2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
    3. Check out the 'imgs' array in the console !Is it like you expected?
    4. Use a promise combinator function to actually get the images from the array😉
    5. Add the 'parallel' class to all the images(it has some CSS styles)
    Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img- 3.jpg']. To test, turn off the 'loadNPause' function
  
  */

const imgContainer = document.querySelector('.images');

const wait = function(seconds){
  return new Promise(function(res){
    setTimeout(res, seconds * 1000)
  });
};

function createImage(imgPath){
    return new Promise(function(resolve,reject){
      const el = document.createElement('img');
      el.classList.add('parallel');
      el.src = imgPath;
  
      el.addEventListener('load', function(){
        imgContainer.append(el)
        resolve(el);
      })
  
      el.addEventListener('error', function(){
        reject(new Error('Something went wrong'));
      })
    });
  }

let currImage;

const loadNPause = async function(){
  try{
    const res = await createImage('img/image1.jpeg')
    currImage = res;
    const wait1 = await wait(2);
    currImage.style.display = 'none';
    const res2 = await createImage('img/image2.jpeg')
    currImage = res2;
    const wait2 = await wait(2);
    currImage.style.display = 'none';
  }catch(err){
    console.error(err);
  }
}

const loadAll = async function(imgArr){
  try{
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    const imgsEl = await Promise.all(imgs)
    console.log(imgsEl);
  }catch(err){
    console.error(err);
  }
  
}

loadAll(['img/image1.jpeg', 'img/image2.jpeg', 'img/image3.jpeg']);
//loadNPause();