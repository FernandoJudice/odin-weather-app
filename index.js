const publicKey = "W24BX67CWZLB6GUALPWFXGQSM"

let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/recife?unitGroup=metric&key=${publicKey}&contentType=json`


fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        console.log(response.currentConditions);
    });

