const publicKey = "W24BX67CWZLB6GUALPWFXGQSM"

const form = document.querySelector("form")
const loading = document.querySelector(".loading")

const temperature = document.querySelector(".temperature")
const conditions = document.querySelector(".conditions")
const humidity = document.querySelector(".humidity")
const unit = document.querySelector(".unit-label")
const unitdiv = document.querySelector(".unit")
const response = document.querySelector(".response")
const img = document.querySelector('.weather-img');

loading.style.display = "none";
response.style.display = "none";

let isCelsius = true;
let unitGroup = 'metric';
let unitName = 'C';

form.addEventListener("submit", (event) => {
    console.log(event.target);
    const location = Object.fromEntries(new FormData(event.target)).location;
    console.log(location)
    loading.style.display = "initial";
    response.style.display = "none";
    
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${publicKey}&contentType=json`
    fetch(url)
        .then((response) => {
                return response.json();
        })
        .then((response) => {
                console.log(response.currentConditions);
                loadConditions(response.currentConditions);
                gifRequest(response.currentConditions.conditions);

        })
        .catch((reject) => {
            alert("Ooops, something went wrong! Is the location correct?")
        });
    event.preventDefault();
})

unitdiv.addEventListener("click", toggleUnit)

function loadConditions(value) {
    loading.style.display = "none";
    response.style.display = "grid";
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

const apiurl = 'https://api.giphy.com/v1/gifs/translate?api_key=eLA7QS23VRBwO41xJ9hcRTmq8wqNant2&s=';

function gifRequest(string) {fetch(apiurl+`${string}`, {mode: 'cors'})
.then(function(response) {
    return response.json();
})
.then(function(response) {
    img.src = response.data.images.original.url;
});
}