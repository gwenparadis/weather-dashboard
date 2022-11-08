
//code taken and remastered from activity 6.1.4 to try and figure out how to make the search into fetch request...
const searchBtn = document.getElementById("search-button");
const weatherLocation = document.getElementById("weather-location");
//let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
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
            currentWeatherInfo.innerText = "Current Temperature: " + (data.main.temp) + "F, Conditions: " + (data.weather[0].icon) + ", Humidity: " + (data.main.humidity) + "%, Wind Speed: " + (data.wind.speed) + " mph";
            currentWeatherDisplay.appendChild(currentWeatherInfo);
            getForecast(data);
        })
        .catch(function (error) {
            console.log(error);
        });
};

//get the forecast data and render it to the page
function getForecast(data) {
    //get request for the 5-day forecast API
    console.log(data);
    console.log(data.coord.lat);
    console.log(data.coord.lon);

    const forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=6f4f8d8e13827c9d81f342b6e1821c12";
    return fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            //get elements by id, set the weather data to a variable, append data to card as you did with current weather data
            //card 1
            const getDayOne = document.getElementById("forecast-displayOne");
            const displayDayOne = document.createElement("p");
            displayDayOne.innerText = "day one info here!";
            getDayOne.appendChild(displayDayOne);

            //card 2
            const getDayTwo = document.getElementById("forecast-displayTwo");
            const displayDayTwo = document.createElement("p");
            displayDayTwo.innerText = "day two info here!";
            getDayTwo.appendChild(displayDayTwo);

            //card 3
            const getDayThree = document.getElementById("forecast-displayThree");
            const displayDayThree = document.createElement("p");
            displayDayThree.innerText = "day three info here!";
            getDayThree.appendChild(displayDayThree);

            //card 4
            const getDayFour = document.getElementById("forecast-displayFour");
            const displayDayFour = document.createElement("p");
            displayDayFour.innerText = "day four info here!";
            getDayFour.appendChild(displayDayFour);

            //card 5
            const getDayFive = document.getElementById("forecast-displayFive");
            const displayDayFive = document.createElement("p");
            displayDayFive.innerText = "day four info here!";
            getDayFive.appendChild(displayDayFive);
        })
        .catch(function (error) {
            console.log(error);
        })
};

searchBtn.addEventListener('click', getCurrentWeather);