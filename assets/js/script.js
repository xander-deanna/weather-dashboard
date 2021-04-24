// url for weather and forecast apis
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="
// my API Key - 05adb7dd98f3deca26d137ae4a2cecef

// html search button element
const searchBtn = document.querySelector("#searchBtn");

// html city elements
const cityOne = document.querySelector("#city1")
const cityTwo = document.querySelector("#city2")
const cityThree = document.querySelector("#city3")
const cityFour = document.querySelector("#city4")
const cityFive = document.querySelector("#city5")

// html element for previously searched cities
const previousCityBtn = document.querySelector("#searchedCities")

// gets cities from local storage
const cityOneSearch = localStorage.getItem("cityone");
const cityTwoSearch = localStorage.getItem("citytwo");
const cityThreeSearch = localStorage.getItem("citythree");
const cityFourSearch = localStorage.getItem("cityfour");
const cityFiveSearch = localStorage.getItem("cityfive");

// displays html element for recent search buttons if not null
if (cityOneSearch !== null) {
    cityOne.textContent = cityOneSearch
    cityOne.style.removeProperty("display")
}
if (cityTwoSearch !== null) {
    cityTwo.textContent = cityTwoSearch
    cityTwo.style.removeProperty("display")
}
if (cityThreeSearch !== null) {
    cityThree.textContent = cityThreeSearch
    cityThree.style.removeProperty("display")
}
if (cityFourSearch !== null) {
    cityFour.textContent = cityFourSearch
    cityFour.style.removeProperty("displsay")
}
if (cityFiveSearch !== null) {
    cityFive.textContent = cityFiveSearch
    cityFive.style.removeProperty("display")
}

// ------------------------------- WEATHER FUNCTIONS ------------------------------- 
// function to get weather data
function getWeatherData(getCityWeather) {

    // API url for current weather
    const cityWeatherURL = weatherURL + getCityWeather + "&units=imperial&appid=05adb7dd98f3deca26d137ae4a2cecef"

    // API url for five day forcast
    const cityForecastURL = forecastURL + getCityWeather + "&units=imperial&appid=05adb7dd98f3deca26d137ae4a2cecef"

    // fetches current weather
    fetch(cityWeatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                return;
            }
        })

        .then(function (data) {
            if (data === undefined || data.cod === "404") {
                return
            }
            // html selectors for the current weather
            const cityName = document.querySelector("#city");
            const cityTemperature = document.querySelector("#temperature");
            const cityHumidity = document.querySelector("#humidity");
            const cityWindspeed = document.querySelector("#windSpeed");
            const cityIcon = document.querySelector("#icon")
            const date = new Date().toLocaleDateString()

            // changes html text to current weather data
            cityName.textContent = data.name + " (" + date + ")";
            cityIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            cityTemperature.textContent = "Temperature: " + data.main.temp + "°F";
            cityHumidity.textContent = "Humidity: " + data.main.humidity + " %";
            cityWindspeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";

            // API url for UV index
            const cityLon = data.coord.lon;
            const cityLat = data.coord.lat;
            const uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=05adb7dd98f3deca26d137ae4a2cecef"


            // fetch statement used to get uvindex, 
            fetch(uvIndexURL)
                .then(function (response) {
                    return response.json();
                })
                // applies css coloring to UV index based on the number returned from fetch
                .then(function (data) {
                    var cityUvIndex = document.querySelector("#uvIndex");
                    cityUvIndex.textContent = "UV Index: " + data.value;

                    if (data.value <= 2) {
                        cityUvIndex.setAttribute("class", "green");
                    }
                    else if (data.value <= 5) {
                        cityUvIndex.setAttribute("class", "yellow");
                    }
                    else if (data.value <= 7) {
                        cityUvIndex.setAttribute("class", "orange");
                    }
                    else if (data.value <= 10) {
                        cityUvIndex.setAttribute("class", "red");
                    }
                    else if (data.value > 10) {
                        cityUvIndex.setAttribute("class", "violet");
                    }
                })
        });

    // fetches five day forecast
    fetch(cityForecastURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                return alert("City Not Found!");
            }
        })
        .then(function (data) {
            if (data === undefined || data.cod === "404") {
                return
            }

            const visibleForecast = document.querySelector("#fiveDayForecast")
            visibleForecast.style.removeProperty("display")
            const cityWeather = document.querySelector("#cityWeather");
            cityWeather.style.removeProperty("display")
            const searchedCities = document.querySelector("#searchedCities");
            searchedCities.style.removeProperty("display")

            // selectors for the parent of the forecast
            const dayOne = document.querySelector("#dayOne");
            const dayTwo = document.querySelector("#dayTwo");
            const dayThree = document.querySelector("#dayThree");
            const dayFour = document.querySelector("#dayFour");
            const dayFive = document.querySelector("#dayFive");

            // first day of forecast
            let dateTime = new Date()
            dateTime.setDate(dateTime.getDate() + 1)
            dateTime = dateTime.toLocaleDateString()
            dayOne.children[0].textContent = dateTime;
            dayOne.children[1].src = "https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png";
            dayOne.children[2].textContent = "Temp: " + data.list[4].main.temp + " °F";
            dayOne.children[3].textContent = "Humidity: " + data.list[4].main.humidity + "%";

            // second day of forecast
            dateTime = new Date()
            dateTime.setDate(dateTime.getDate() + 2)
            dateTime = dateTime.toLocaleDateString()
            dayTwo.children[0].textContent = dateTime;
            dayTwo.children[1].src = "https://openweathermap.org/img/wn/" + data.list[12].weather[0].icon + "@2x.png";
            dayTwo.children[2].textContent = "Temp: " + data.list[12].main.temp + " °F";
            dayTwo.children[3].textContent = "Humidity: " + data.list[12].main.humidity + "%";

            // third day of forecast
            dateTime = new Date()
            dateTime.setDate(dateTime.getDate() + 3)
            dateTime = dateTime.toLocaleDateString()
            dayThree.children[0].textContent = dateTime;
            dayThree.children[1].src = "https://openweathermap.org/img/wn/" + data.list[20].weather[0].icon + "@2x.png";
            dayThree.children[2].textContent = "Temp: " + data.list[20].main.temp + " °F";
            dayThree.children[3].textContent = "Humidity: " + data.list[20].main.humidity + "%";

            // fourth day of forecast
            dateTime = new Date()
            dateTime.setDate(dateTime.getDate() + 4)
            dateTime = dateTime.toLocaleDateString()
            dayFour.children[0].textContent = dateTime;
            dayFour.children[1].src = "https://openweathermap.org/img/wn/" + data.list[28].weather[0].icon + "@2x.png";
            dayFour.children[2].textContent = "Temp: " + data.list[28].main.temp + " °F";
            dayFour.children[3].textContent = "Humidity: " + data.list[28].main.humidity + "%";

            // fifth day of forecast
            dateTime = new Date()
            dateTime.setDate(dateTime.getDate() + 5)
            dateTime = dateTime.toLocaleDateString()
            dayFive.children[0].textContent = dateTime;
            dayFive.children[1].src = "https://openweathermap.org/img/wn/" + data.list[36].weather[0].icon + "@2x.png";
            dayFive.children[2].textContent = "Temp: " + data.list[36].main.temp + " °F";
            dayFive.children[3].textContent = "Humidity: " + data.list[36].main.humidity + "%";
        });
}

// ------------------------------- SEARCH FUNCTIONS ------------------------------- 
// function for search button
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // takes in user search input from form, and makes first letter of every word uppercase for consistancy
    const searchInputNoFormat = document.querySelector("#searchInput").value
    const searchInputSplit = searchInputNoFormat.split(" ");
    for (let i = 0; i < searchInputSplit.length; i++) {
        searchInputSplit[i] = searchInputSplit[i][0].toUpperCase() + searchInputSplit[i].substr(1);
    }
    const searchInput = searchInputSplit.join(" ");
    getWeatherData(searchInput)

    // checks if a city already exists in recent searches to avoid duplicates
    if (cityOne.textContent == searchInput || cityTwo.textContent == searchInput || cityThree.textContent == searchInput || cityFour.textContent == searchInput || cityFive.textContent == searchInput) {
        return null
    }

    // populates search history from local storage
    else if (cityOne.textContent === "") {
        cityOne.textContent = searchInput
        localStorage.setItem("cityone", searchInput);
        cityOne.style.removeProperty("display")
    }
    else if (cityTwo.textContent === "") {
        cityTwo.textContent = searchInput
        localStorage.setItem("citytwo", searchInput);
        cityTwo.style.removeProperty("display")
    }
    else if (cityThree.textContent === "") {
        cityThree.textContent = searchInput
        localStorage.setItem("citythree", searchInput);
        cityThree.style.removeProperty("display")
    }
    else if (cityFour.textContent === "") {
        cityFour.textContent = searchInput
        localStorage.setItem("cityfour", searchInput);
        cityFour.style.removeProperty("display")
    }
    else if (cityFive.textContent === "") {
        cityFive.textContent = searchInput
        localStorage.setItem("cityfive", searchInput);
        cityFive.style.removeProperty("display")
    }
    // makes the search history a max of 5
    else {
        cityOne.textContent = cityTwo.textContent
        localStorage.setItem("cityone", cityOne.textContent);
        cityTwo.textContent = cityThree.textContent
        localStorage.setItem("citytwo", cityTwo.textContent);
        cityThree.textContent = cityFour.textContent
        localStorage.setItem("citythree", cityThree.textContent);
        cityFour.textContent = cityFive.textContent
        localStorage.setItem("cityfour", cityFour.textContent);
        cityFive.textContent = searchInput
        localStorage.setItem("cityfive", searchInput);
    }
})

// event listener for cities in previously searched list
previousCityBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    // gets the text of the button clicked on a previously searched city
    previousCityBtnEl = event.target.innerText
    getWeatherData(previousCityBtnEl)
})

// loops through previously searched cities to find the last one in the list to display upon refresh of the page
for (let i = 4; i >= 0; i--) {
    if (previousCityBtn.children[i].children[0].textContent !== "") {
        getWeatherData(previousCityBtn.children[i].children[0].textContent);
        break;
    }
}