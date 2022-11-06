
//code taken and remastered from activity 6.1.4 to try and figure out how to make the search into fetch request...
const searchBtn = document.getElementById("search-button");
const weatherLocation = document.getElementById("weather-location");
let currentWeatherData;
const cityName = searchBtn.parentElement.children[1];

//fetch request to get weather forecast location with geocoding API
function getCurrentWeather() {
    //get request to enter into fetch request
    const locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + (cityName.value) + '&appid=6f4f8d8e13827c9d81f342b6e1821c12';

    fetch(locationUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            console.log('the latitude and longitude coordinates are:' + lat + " ," + lon);

            const forecastUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&APPID=6f4f8d8e13827c9d81f342b6e1821c12';
            return fetch(forecastUrl);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.main);

            const currentWeatherDisplay = document.getElementById("current-weather-display");
            const currentWeatherInfo = document.createElement("p");
            currentWeatherInfo.innerText = "Current Temparature " + (data.main.temp) + " degrees Fahrenheit";
            currentWeatherDisplay.append(currentWeatherInfo);
            }
        );
};


searchBtn.addEventListener('click', getCurrentWeather);