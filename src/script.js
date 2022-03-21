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

// weekly forecast
function getForecast(coordinates) {
  let apiKey = "bcf9720f0367350350dbbc0b6b9dd4da";
  let apiURL = `
https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${apiKey}
`;
  axios.get(apiURL).then(displayForecast);
}

function formatWeekday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let weeklyForecast = document.querySelector("#forecast");
  let weeklyForecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      weeklyForecastHTML =
        weeklyForecastHTML +
        `<div class="col-sm-2">
                  <div class="weekday">${formatWeekday(forecastDay.dt)} </div>
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" width="55px" />
                  <div class="weekday-temperature">
                  <span class="weekday-high">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weekday-low">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                  </div>
                </div>
        `;
    }
  });
  weeklyForecastHTML = weeklyForecastHTML + `</div>`;
  weeklyForecast.innerHTML = weeklyForecastHTML;
}

// search city temperature
function getSearchCityData(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;
  let apiKey = "bcf9720f0367350350dbbc0b6b9dd4da";
  let units = "metric";
  let cityWeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=${units}&appid=${apiKey}`;

  axios.get(cityWeatherApiURL).then(showCurrentTemp);
}

// current city temperature
function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "bcf9720f0367350350dbbc0b6b9dd4da";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(weatherApiUrl).then(showCurrentTemp);
}

// get current temperature
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

  getForecast(response.data.coord);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

// default search city temp
function defaultSearch(city) {
  let apiKey = "bcf9720f0367350350dbbc0b6b9dd4da";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}

defaultSearch("Los Angeles");

currentDateTime();

let form = document.querySelector("#search-form");
form.addEventListener("submit", getSearchCityData);

let currentBtn = document.querySelector("#current-city");
currentBtn.addEventListener("click", getCurrentLocation);
