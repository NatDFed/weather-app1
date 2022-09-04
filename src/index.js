let thisDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[thisDate.getDay()];
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day}`;
let hour = thisDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = thisDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentHour = document.querySelector("#hour");
currentHour.innerHTML = `${hour}:${minutes}`;

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure
  );
}

function searchCity(city) {
  let apiKey = "10566d0f9902e77e497ca722e7aa0b84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function findPosition(position) {
  let apiKey = "10566d0f9902e77e497ca722e7aa0b84";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
let currentPositionButton = document.querySelector("#current-button");
currentPositionButton.addEventListener("click", getCurrentPosition);
searchCity("Cork");
