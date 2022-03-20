// Current Date and Time
function currentDateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  let currentMinutes = ("0" + now.getMinutes()).slice(-2);

  let h2 = document.querySelector("#currentDateTime");

  h2.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinutes}`;
}

function returnForecast() {
  let weeklyForecast = document.querySelector("#forecast");
  let weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri"];
  let weeklyForecastHTML = `<div class="row">`;

  weekdays.forEach(function (day) {
    weeklyForecastHTML =
      weeklyForecastHTML +
      `<div class="col-sm-2">
                  <div class="weekday">${day} </div>
                  <div class="weekday-weather-icon">🌤</div>
                  <div class="weekday-temperature">
                  <span class="weekday-high">72°</span>
                  <span class="weekday-low">43°</span>
                  </div>
                </div>
        `;
  });
  weeklyForecastHTML = weeklyForecastHTML + `</div>`;
  weeklyForecast.innerHTML = weeklyForecastHTML;
}

// Search City Temperature
function getSearchCityData(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;
  let apiKey = "bcf9720f0367350350dbbc0b6b9dd4da";
  let units = "metric";
  let cityWeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=${units}&appid=${apiKey}`;

  axios.get(cityWeatherApiURL).then(searchCityTemp);
}

function searchCityTemp(response) {
  let currentCity = response.data.name;
  let header = `${currentCity}`;
  let h1 = document.querySelector("h1");
  let searchCityTemperature = document.querySelector("#current-temp");
  let currentDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let weatherIcon = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = header;
  searchCityTemperature.innerHTML = Math.round(celsiusTemperature);
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", `${currentDescription}`);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getSearchCityData);

// Current City Temperature
function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "bcf9720f0367350350dbbc0b6b9dd4da";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(weatherApiUrl).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let currentCity = response.data.name;
  let header = `${currentCity}`;
  let h1 = document.querySelector("h1");
  let currentTemperature = document.querySelector("#current-temp");
  let currentDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let weatherIcon = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = header;
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", `${currentDescription}`);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentBtn = document.querySelector("#current-city");
currentBtn.addEventListener("click", getCurrentLocation);

// change current temperature with celsius/fahrenheit links
function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  linkCelsius.classList.add("active");
  linkFahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  linkCelsius.classList.remove("active");
  linkFahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

// default search city temp
function defaultSearch(city) {
  let apiKey = "bcf9720f0367350350dbbc0b6b9dd4da";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}

let celsiusTemperature = null;

defaultSearch("Los Angeles");
currentDateTime();
returnForecast();

let linkCelsius = document.querySelector("#celsius-link");
linkCelsius.addEventListener("click", convertCelsius);

let linkFahrenheit = document.querySelector("#fahrenheit-link");
linkFahrenheit.addEventListener("click", convertFahrenheit);
