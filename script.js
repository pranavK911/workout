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
// const workouttype = document.getElementById('workouttype').value;
const cadence  = document.getElementById('cadence');
const elevation = document.getElementById('elevation')

document.getElementById('workouttype').addEventListener('click',()=>{
    let workouttype=inputType.value;
    console.log(workouttype);
    if (workouttype === 'running') {
        cadence.classList.remove('form__row--hidden');
      elevation.classList.add('form__row--hidden');
      } else if (workouttype === 'cycling') {
        cadence.classList.add('form__row--hidden');
        elevation.classList.remove('form__row--hidden');
      }
})

let moveEvent,map;

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((postion)=>{
        // console.log(postion);
        const {latitude,longitude}=postion.coords
        // console.log(latitude,longitude);
        const cord=[latitude,longitude]
        map = L.map('map').setView(cord, 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


map.on('click',(mE)=>{
    moveEvent=mE;
    //  console.log(mE);
    form.classList.remove('hidden');  
    inputDistance.focus();
   
})
    },()=>{
        alert('---------')
    })
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const {lat,lng}=moveEvent.latlng
     inputCadence.value=inputDuration.value=inputDistance.value=inputElevation.value='';
    //  console.log(lat,lng);
    L.marker([lat,lng]).addTo(map)
    .bindPopup(
        L.popup({
            maxWidth:250,
            maxHeidth:100,
            autoClose:false,
            closeOnClick:false,
            className:'running-popup'
        })
    ).setPopupContent('okkk')
    .openPopup();
    form.classList.add('hidden');  
})