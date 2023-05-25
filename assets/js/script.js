let searchHistory = [];
let apiKey = "6d1d20fdf7cdd2f943896cd1e2c397b5";

let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search-input");
let history = document.querySelector("#history");
let today = document.querySelector("#today");
let forecast = document.querySelector("#forecast");

function searchCity(event) {
    event.preventDefault();

    // capture the user input --> input element value
    console.log("Event: ", event)
    console.log("Target: ", event.target)
    console.log("Value: ", searchInput.value);
    let cityName = searchInput.value
    if (cityName === '') {
        return;
    }
    // either CALL or PASS the city name to our FETCH method/function

    let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
    fetch(geoUrl)
        .then(response => {
            console.log("Response: ", response)
            return response.json()
        })
        .then(data => {
            console.log("Data: ", data);
            let lat = data[0].lat;
            let lon = data[0].lon;

            console.log("Coord: ", lat, lon);

            // PASS the values on to the function being called
            currentWeather(lat, lon, cityName);
            forecastWeather(lat, lon, cityName);
            // let cityList = localStorage.getItem();
            // if (cityList) {

            // }
            if (searchHistory.indexOf(cityName) === -1) {
                searchHistory.push(cityName);
                localStorage.setItem("cityList", JSON.stringify(searchHistory));
                showSearchHistory();
            }
        })
        .catch(error => {
            throw error;
        });

}

function currentWeather(lat, lon, cityName) {

    let currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    fetch(currentWeatherAPI)
        .then(response => response.json())
        .then(data => {
            console.log("Current Weather Data: ", data);

            let temp = ((data.main.temp - 273.15) * 9) / 5 + 32;
            temp = temp.toFixed(2);
            let wind = data.wind.speed;
            let humidity = data.main.humidity;
            let currentDay = dayjs();
            console.log(currentDay);
            currentDay = currentDay.format("MM/DD/YYYY");

            // Create new elements and APPEND them to the DOM 
            let displayHeading = document.createElement("h2");
            displayHeading.setAttribute("id", "title");
            let iconImg = document.createElement("img");
            let iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            iconImg.setAttribute("src", iconUrl);

            displayHeading.textContent = cityName + " (" + currentDay + ") ";
            today.append(displayHeading);
            displayHeading.append(iconImg);


            let tempElement = document.createElement("p");
            tempElement.textContent = "Temperature: " + temp + "°F";
            today.append(tempElement);

            let windElement = document.createElement("p");
            windElement.textContent = "Wind: " + wind + " mph";
            today.append(windElement);

            let humElement = document.createElement("p");
            humElement.textContent = "Humidity: " + humidity + "%";
            today.append(humElement);
        })
        .catch(error => {
            throw error;
        });
}

function forecastWeather(lat, lon, cityName) {

    let forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    // let forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

    fetch(forecastAPI)
        .then(response => response.json())
        .then(data => {
            console.log("Forecast Data: ", data);

            for (i = 0; i < forecast.length; i++) {
                let forecastIndex = i * 8 + 4;

                // let temp = ;
                // let wind = ;
                // let humidity = ;

                // // needs date and icon added

                // let tempElement = document.createElement("p");
                // tempElement.textContent = "Temperature: " + temp;
                // today.append(tempElement);

                // let windElement = document.createElement("p");
                // windElement.textContent = "Wind: " + wind + " mph";
                // today.append(windElement);

                // let humElement = document.createElement("p");
                // humElement.textContent = "Humidity: " + humidity + "%";
                // today.append(humElement);
            }
        })
        .catch(error => {
            throw error;
        });
}

// function searchHistory() {
//     history.innerHTML = "";

//     for (let i = history.length - 1; i >= 0; i--) {
//         let btn = document.createElement("button");
//         btn.setAttribute("type", "button");
//         btn.setAttribute("", searchHistory[i]);
//         btn.textContent = searchHistory[i];
//         history.append(btn);
//     }
//     searchHistory();
// }
function showSearchHistory() {
    let cityList = localStorage.getItem("cityList");
    if (cityList) {
        let cityListArr = JSON.parse(cityList)
        history.innerHTML = "";
        for (let i = cityListArr.length - 1; i >= 0; i--) {
            let btn = document.createElement("button");
            btn.setAttribute("type", "button");
            // btn.setAttribute("", searchHistory[i]);
            btn.textContent = searchHistory[i];
            history.append(btn);
        }
    }
}
    searchForm.addEventListener("submit", searchCity); 
