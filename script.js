
//code taken and remastered from activity 6.1.4 to try and figure out how to make the search into fetch request...
const searchBtn = document.getElementById("search-button");
const weatherLocation = document.getElementById("weather-location");
const cityName = searchBtn.parentElement.children[1];
let lat;
let lon;

//fetch request to get weather forecast location with geocoding API
function getCurrentWeather() {
    //Set current weather box to be titled with the searched city name
    weatherLocation.innerText = "Current Weather in " + cityName.value;
    //get request for geolocation API, turn city name into latitude-longitude
    const locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + (cityName.value) + '&appid=6f4f8d8e13827c9d81f342b6e1821c12';

    fetch(locationUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;

            console.log('the latitude and longitude coordinates are: ' + lat + " ," + lon);

            const currentWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&APPID=6f4f8d8e13827c9d81f342b6e1821c12';
            return fetch(currentWeatherUrl);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.main);

            const currentWeatherDisplay = document.getElementById("current-weather-display");
            const currentWeatherInfo = document.createElement("p");
            currentWeatherInfo.innerText = "Current Temperature: " + (data.main.temp) + " F, Humidity: " + (data.main.humidity) + "%, Wind Speed: " + (data.wind.speed) + " mph";
            currentWeatherDisplay.appendChild(currentWeatherInfo);
        });

    getForecast();
};

//need to debug the following; keep getting 400 error
function getForecast() {
    //get request for the 5-day forecast API
    const forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "units=imperial&appid=6f4f8d8e13827c9d81f342b6e1821c12";
    return fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })

    //const forecastDisplay = document.getElementById()
};

searchBtn.addEventListener('click', getCurrentWeather);