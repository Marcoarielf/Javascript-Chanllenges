'use strict';



class Workout{
    // define variables here is not supported currently.
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords,distance,duration){
        this.coords = coords; // [lat,lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
    
    _setDescription(){
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
       this.description = `
        ${this.type[0].toUpperCase()}${this.type.slice(1)}
        on
        ${months[this.date.getMonth()]}
        ${this.date.getDate()}
        `
    }
}

class Running extends Workout{
    type = 'running';
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }
    
    calcPace(){
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class Cycling extends Workout{
    type = 'cycling'; // available in all the instances 
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed(); 
        this._setDescription();
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

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    // private 
    #map;
    #mapEvent;
    #mapZoomLevel = 13;
    #workouts = [];
    // constructor se ejecuta cuando se crea un objeto. Como abajo estoy creando un objeto y se instancia inmediatamente se
    // ejecuta el script, constructor entonces se ejecuta también.
    constructor(){
        this._getPosition();
        this._getLocalStorage();
        form.addEventListener('submit', this._newWorkout.bind(this))
        inputType.addEventListener('change',this._toggleElevationField)
        containerWorkouts.addEventListener('click',this._moveToPopup.bind(this));
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

        this.#map = L.map('map').setView(cords, this.#mapZoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
    
        this.#map.on('click',this._showForm.bind(this));

        //if localstorage have data, #workouts array isn't empty so there is markers to display.
        this.#workouts.forEach(work => this._renderWorkOutMarker(work));
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus()
    }

    _hideForm(){
        // hide form on the list and clear input fields.
        inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = '';
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000);
    }
    
    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    
    _newWorkout(e){

        e.preventDefault();

        const validateInputs = (...inputs) => {
            inputs.every( inp => Number.isFinite(inp) && inp>0) ;
        }

        const allPositive = (...inputs) => inputs.every( inp => inp > 0);
        //  Get data from the form

        const type = inputType.value;
        // quick way to convert a string in a number: put + at the beggining.
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const {lat,lng} = this.#mapEvent.latlng;
        let workout;
        // if workout is running, then create running object
        if(type === 'running'){
            const cadence = +inputCadence.value;
            // check if data is valid
            if(!validateInputs(distance, duration, cadence) && !allPositive(distance,duration,cadence)) return alert('Inputs have to be a positive number')
            workout = new Running([lat,lng], distance, duration, cadence);
            this.#workouts.push(workout);
        }
        // if workout is cycling, create cycling object.
        if(type === 'cycling'){
            const elevation = +inputElevation.value;
            if(!validateInputs(distance, duration, elevation) && !allPositive(distance,duration, elevation)) return alert('inputs have to be a positive number')
            workout = new Cycling([lat,lng], distance, duration, elevation);
        }
        // add new object to the workout array
        
        this.#workouts.push(workout);
        console.log(workout);
        // render workout on map as a market
        this._renderWorkOutMarker(workout);
        
        // render workout on the list
        this._renderWorkout(workout);

        // clear form + hide
        this._hideForm();

        // set localStorage
        this._setLocalStorage();
    }

    _renderWorkOutMarker(workout){
        L.marker(workout.coords).addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250, 
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        }))
        .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
        .openPopup();
    }

    _renderWorkout(workout){
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
        `;

        if(workout.type === 'running'){
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>
            `;
        }
        if(workout.type === 'cycling'){
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>
            `;
        }
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e){
        const workoutEl = e.target.closest('.workout');
        console.log(workoutEl);

        if(!workoutEl) return; // avoid null when click on empty

        const workout = this.#workouts.find(
            work => work.id === workoutEl.dataset.id
        );

        console.log(workout);

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        })
    }

    _setLocalStorage(){
        //JSON.stringify convert any object to a string.
        localStorage.setItem('workouts', JSON.stringify(this.#workouts))
    }

    _getLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'));
        console.log(data);

        if(!data) return;

        this.#workouts = data;

        this.#workouts.forEach(work => this._renderWorkout(work));
    }
}

const app = new App();

/* TO DO
1. Ability to edit a workout
2. Ability to delete a workout
2. Ability to dellete all workouts
2. Ability to sort workouts by duration or something like that.
. improve alert messages
. ability to position the map to show all the workouts -- hard
. ability to draw lines and shapes instead of points -- hard
. display weather -- only after next section

*/