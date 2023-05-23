// let searchHistory = [];
let apiKey = "6d1d20fdf7cdd2f943896cd1e2c397b5";
// let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
// icons
// let iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`

let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search-input");
let history = document.querySelector("#history");
let today = document.querySelector("#today");
let forecast = document.querySelector("#forecast");

function searchCity(event) {
    event.preventDefault();
    
    // we need to capture the user input --> input element value
    console.log("Event: ", event)
    console.log("Target: ", event.target)
    console.log("Value: ", searchInput.value);
    let cityName = searchInput.value
    if(cityName === '') {
        return;
    }
    // either CALL or PASS the city name to our FETCH method/function
    
    let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
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

            // If we want to make an second or third or fouth ... API call using the data we gathered. We have to do it inside the function scope

            // PASS the values on to the function being called
            currentWeather(lat, lon);
        })
        .catch(error => {
            throw error;
        });
        
    }
    
function currentWeather(lat, lon) {
    
    //let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${name}&units=imperial`;
    let currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    
    fetch(currentWeatherAPI)
        .then(response => response.json())
        .then(data => {
            console.log("Current Weather Data: ", data);

            let temp = data.main.temp;

            // Create new elements and APPEND them to the DOM 
            let tempElement = document.createElement('h2');
            tempElement.textContent = temp;
            today.append(tempElement);
        })
        .catch(error => {
            throw error;
        });
}

function searchHistory() {
    history.innerHTML = "";

    for (let i = history.length - 1; i >= 0; i--) {
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.classList("");
        btn.setAttribute("", searchHistory[i]);
        btn.textContent = searchHistory[i];
        history.append(btn);
    }
    searchHistory();
}

searchForm.addEventListener("submit", searchCity); 
