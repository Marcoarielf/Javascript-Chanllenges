import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js'

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const AJAX = async function(url, uploadData = undefined){
  try{
    const fetchPro = uploadData ? 
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }) : fetch(url);

    // Promise.race([]) we use for cancel fetch if take too long time.
    // The Promise that win the race will be the first who return even reject or fullfilled.
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    // data: resolve value of the promise
    return data;
    }catch(err){
        // re-throwing error, could we manage the hanlder error from model.js
        // because now, the promise will be reject and not fullfilled.
        throw err;
    }
}

/*
// getJSON returns a fullfiled promise even if there is an error.
export const getJSON = async function(url){
    try{
    // Promise.race([]) we use for cancel fetch if take too long time.
    // The Promise that win the race will be the first who return even reject or fullfilled.
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    // data: resolve value of the promise
    return data;
    }catch(err){
        // re-throwing error, could we manage the hanlder error from model.js
        // because now, the promise will be reject and not fullfilled.
        throw err;
    }
}

export const sendJSON = async function(url, uploadData){
  try{

    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    })

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    // data: resolve value of the promise
    return data;
  }catch(err){
      // re-throwing error, could we manage the hanlder error from model.js
      // because now, the promise will be reject and not fullfilled.
      throw err;
  }
}

*/