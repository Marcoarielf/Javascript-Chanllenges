'use strict';

// WHAT I DO: print in console log the values of the array.
/* HOW WE DO: 
    -  Creating a function, called 'printforecast'
    - Create an array called 'arr' which containg temperature valuees.
*/

const arr = [17, 21, 23];
let text = "";
const printforecast = function(arr){
    for(let i = 0; i<arr.length; i++){
        text += `... ${arr[i]}°C in ${i + 1} days `;
        
    }
    console.log(text + '...');
}
printforecast(arr);