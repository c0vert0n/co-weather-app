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

currentDateTime();

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
  h1.innerHTML = header;

  // document.querySelector("h1").innerHTML = response.data.name;

  let currentTemp = Math.round(response.data.main.temp);
  let searchCityTemperature = document.querySelector("#current-temp");
  searchCityTemperature.innerHTML = currentTemp;

  // document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
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
  let currentTemp = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let header = `${currentCity}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = header;
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = currentTemp;
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentBtn = document.querySelector("#current-city");
currentBtn.addEventListener("click", getCurrentLocation);

// change current temperature with celsius/fahrenheit links
function convertCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#current-temp");
  tempCelsius.innerHTML = `24`;
}

// convert temperature units
function convertFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = document.querySelector("#current-temp");
  tempFahrenheit.innerHTML = `76`;
}

let linkCelsius = document.querySelector("#celsius");
linkCelsius.addEventListener("click", convertCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);
