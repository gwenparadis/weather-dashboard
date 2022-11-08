
//code taken and remastered from activity 6.1.4 to try and figure out how to make the search into fetch request...
const searchBtn = document.getElementById("search-button");
const weatherLocation = document.getElementById("weather-location");
//let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
const cityName = searchBtn.parentElement.children[1];
let lat;
let lon;

//fetch request to get weather forecast location with geocoding API
function getCurrentWeather() {
    //get request for geolocation API, turn city name into latitude-longitude
    const locationUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + (cityName.value) + '&appid=6f4f8d8e13827c9d81f342b6e1821c12';

    fetch(locationUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;

            console.log('the latitude and longitude coordinates are: ' + lat + " ," + lon);

            const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&APPID=6f4f8d8e13827c9d81f342b6e1821c12';
            return fetch(currentWeatherUrl);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.main);

            const currentWeatherDisplay = document.getElementById("current-weather-display");
            weatherLocation.innerText = "Current Weather in " + cityName.value + " on " + data.dt;
            currentWeatherDisplay.innerText = "Current Temperature: " + (data.main.temp) + "F, Icon: " + (data.weather[0].icon) + ", Humidity: " + (data.main.humidity) + "%, Wind Speed: " + (data.wind.speed) + " mph";
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

    const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=6f4f8d8e13827c9d81f342b6e1821c12";
    return fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            //get elements by id, set the weather data to a variable, append data to card as you did with current weather data
            //card 1
            const dayNameOne = document.getElementById("forecastOne");
            dayNameOne.innerText = data.list[3].dt_txt;
            const getDayOne = document.getElementById("forecast-displayOne");
            getDayOne.innerText = "Temperature: " + (data.list[3].main.temp) + "F, Icon: " + (data.list[3].weather[0].icon) + ", Humidity: " + (data.list[3].main.humidity) + "%, Wind Speed: " + (data.list[3].wind.speed) + "mph";

            //card 2
            const dayNameTwo = document.getElementById("forecastTwo");
            dayNameTwo.innerText = data.list[11].dt_txt;
            const getDayTwo = document.getElementById("forecast-displayTwo");
            getDayTwo.innerText = "Temperature: " + (data.list[11].main.temp) + "F, Icon: " + (data.list[11].weather[0].icon) + ", Humidity: " + (data.list[11].main.humidity) + "%, Wind Speed: " + (data.list[11].wind.speed) + "mph";

            //card 3
            const dayNameThree = document.getElementById("forecastThree");
            dayNameThree.innerText = data.list[19].dt_txt;
            const getDayThree = document.getElementById("forecast-displayThree");
            getDayThree.innerText = "Temperature: " + (data.list[19].main.temp) + "F, Icon: " + (data.list[19].weather[0].icon) + ", Humidity: " + (data.list[19].main.humidity) + "%, Wind Speed: " + (data.list[19].wind.speed) + "mph";

            //card 4
            const dayNameFour = document.getElementById("forecastFour");
            dayNameFour.innerText = data.list[27].dt_txt;
            const getDayFour = document.getElementById("forecast-displayFour");
            getDayFour.innerText = "Temperature: " + (data.list[27].main.temp) + "F, Icon: " + (data.list[27].weather[0].icon) + ", Humidity: " + (data.list[27].main.humidity) + "%, Wind Speed: " + (data.list[27].wind.speed) + "mph";

            //card 5
            const dayNameFive = document.getElementById("forecastFive");
            dayNameFive.innerText = data.list[35].dt_txt;
            const getDayFive = document.getElementById("forecast-displayFive");
            getDayFive.innerText = "Temperature: " + (data.list[35].main.temp) + "F, Icon: " + (data.list[35].weather[0].icon) + ", Humidity: " + (data.list[35].main.humidity) + "%, Wind Speed: " + (data.list[35].wind.speed) + "mph";
        })
        .catch(function (error) {
            console.log(error);
        })
};

searchBtn.addEventListener('click', getCurrentWeather);