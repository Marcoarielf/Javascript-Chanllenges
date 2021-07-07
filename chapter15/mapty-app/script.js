'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout{
    // define variables here is not supported currently.
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords,distance,duration){
        this.coords = coords; // [lat,lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
}

class Running extends Workout{
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace(){
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class Cycling extends Workout{
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed(); 
    }

    calcSpeed(){
        //km/h
        this.speed = this.distance * (this.duration / 60);
        return this.speed;
    }
}

// const run1 = new Running([12,-13], 5.2, 23, 178);
// const cycling = new Cycling([12,-13], 5.2, 23, 253);
// console.log(run1,cycling);

//////////////////////////
// APLICATION ARCHITECTURE

class App {
    // private 
    #map;
    #mapEvent;
    // constructor se ejecuta cuando se crea un objeto. Como abajo estoy creando un objeto y se instancia inmediatamente se
    // ejecuta el script, constructor entonces se ejecuta también.
    constructor(){
        this._getPosition();

        form.addEventListener('submit', this._newWorkout.bind(this))
        
        inputType.addEventListener('change',this._toggleElevationField)
    }

    _getPosition(){
        if(navigator.geolocation){
            // this._loadMap es un callBack de una regular function.
            // como el this keyword de una regular function es undefined
            // podemos bindearla. bind(this) apunta al current object (App)
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function(){
                    alert('error');
                }
            );
        }
    }

    _loadMap(position){
        const {latitude,longitude} = position.coords;
        console.log(latitude,longitude);

        const cords = [latitude,longitude];

        this.#map = L.map('map').setView(cords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
    
        this.#map.on('click',this._showForm.bind(this));
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus()
    }
    
    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    
    _newWorkout(e){

        e.preventDefault();
        
        // clear input fields
        inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = '';
    
        const {lat,lng} = this.#mapEvent.latlng;
        L.marker([lat,lng]).addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250, 
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup'
        }))
        .setPopupContent('Workout')
        .openPopup();
    }
}

const app = new App();

