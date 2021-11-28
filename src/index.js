let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let h4 = document.querySelector("h4");
h4.innerHTML = `${day}, ${hour}:${minutes}`;

function conversionFahrenheitLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahreneitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temperature");

  temperatureElement.innerHTML = Math.round(fahreneitTemperature);
}
function conversionCelsiusLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#current-temperature");

  temperatureElement.innerHTML = Math.round(fahreneitTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", conversionFahrenheitLink);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", conversionCelsiusLink);
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#week-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
       ${index}
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="max-temperature"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="min-temperature">${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = "c5e1f4b02577647cb3da3a656eabc850";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${currentTemperature}`;
  celsiusTemperature = response.data.main.temp;

  let currentWeather = response.data.weather[0].description;
  let weather = document.querySelector("#weather-description");
  weather.innerHTML = `${currentWeather}`;

  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${currentWind}km/h`;

  let currentHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "c5e1f4b02577647cb3da3a656eabc850";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Rome");
