const publicKey = "W24BX67CWZLB6GUALPWFXGQSM"

const form = document.querySelector("form")
const loading = document.querySelector(".loading")

const temperature = document.querySelector(".temperature")
const conditions = document.querySelector(".conditions")
const humidity = document.querySelector(".humidity")
const unit = document.querySelector(".unit-label")
const response = document.querySelector(".response")

loading.hidden = true

let isCelsius = true;
let unitGroup = 'metric';
let unitName = 'C';

form.addEventListener("submit", (event) => {
    console.log(event.target);
    const location = Object.fromEntries(new FormData(event.target)).location;
    console.log(location)
    loading.hidden = false;
    response.hidden = true;
    
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${publicKey}&contentType=json`
    fetch(url)
        .then((response) => {
                return response.json();
        })
        .then((response) => {
                console.log(response.currentConditions);
                loadConditions(response.currentConditions);
        })
        .catch((reject) => {
            alert("Ooops, something went wrong! Is the location correct?")
        });
    event.preventDefault();
})

unit.addEventListener("click", toggleUnit)

function loadConditions(value) {
    loading.hidden = true;
    response.hidden = false;
    temperature.textContent = value.temp + " " + unitName;
    conditions.textContent = value.conditions;
    humidity.textContent = value.humidity + " %";
}

function toggleUnit() {
    if (isCelsius) {
        unitGroup = "us"
        unit.textContent = "Fahrenheit";
        unitName = 'F'
    } else {
        unitGroup = "metric";
        unit.textContent = "Celsius";
        unitName = 'C'
    }
    isCelsius = !isCelsius;
}