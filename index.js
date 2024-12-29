const publicKey = "W24BX67CWZLB6GUALPWFXGQSM"

const form = document.querySelector("form")
const loading = document.querySelector(".loading")

const temperature = document.querySelector(".temperature")
const conditions = document.querySelector(".conditions")
const humidity = document.querySelector(".humidity")

loading.hidden = true

let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/recife?unitGroup=metric&key=${publicKey}&contentType=json`


form.addEventListener("submit", (event) => {
    console.log(event.target);
    const location = Object.fromEntries(new FormData(event.target)).location;
    console.log(location)
    loading.hidden = false
    
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${publicKey}&contentType=json`
    fetch(url)
        .then((response) => {
                return response.json();
        })
        .then((response) => {
                console.log(response.currentConditions);
                loadConditions(response.currentConditions);
        })
        .catch((reject) => {
            console.log("Invalid location")
        });
    event.preventDefault();
})


function loadConditions(value) {
    loading.hidden = true;
    temperature.textContent = value.temp;
    conditions.textContent = value.conditions;
    humidity.textContent = value.humidity;
}

