let now = new Date();
console.log(now);

function formatDate(date) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
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
  let dateNow = date.getDate();
  let dayNow = days[date.getDay()];
  let monthNow = months[date.getMonth()];
  let yearNow = date.getFullYear();
  let hoursNow = date.getHours();
  let minutesNow = date.getMinutes();
  let formatDate = `${dayNow},<br />${dateNow} ${monthNow} ${yearNow}, ${hoursNow}:${minutesNow} hrs`;
  return formatDate;
}

let mainDay = document.querySelector(".rowMainDay");
mainDay.innerHTML = formatDate(new Date());

function capatilizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="forecastDates">
        ${day},<br />12/01
      </div>          
      <div class="temp-range">
        <span class="temp-range-min">-3ºC</span><span class="temp-range-max"> - 12ºC</span>
      </div>
      <img id="weatherIconNext" alt="Clear" src="" />
      <i class="fas fa-cloud-showers-heavy"></i>
      <div class="col px-1 arrow" id="arrow">
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>

  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//weather today

function showTemp(response) {
  document.querySelector("#cityShown").innerHTML = response.data.name;
  document.querySelector("#temperatureNow").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-min0").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#temp-max0").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#wind0").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity0").innerHTML = response.data.main.humidity;
  document.querySelector("weatherIconNow");
  weatherIconNow.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconNow.setAttribute("alt", response.data.weather[0].icon);
}

//displaying days

displayForecast();

// info based on city search
function searchInput(city) {
  let apiKey = "4cca19136987fd45a7562c340065ee08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityTyped").value;
  cityShown.innerHTML = `${city}`;
  searchInput(city);
}

//  = document.querySelector("#cityShown");
//
//  let apiKey = "4cca19136987fd45a7562c340065ee08";
//  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityShown}&appid=${apiKey}&units=metric`;
//  axios.get(`${apiUrl}`).then(showTemp);

let form = document.querySelector("#whatCity");
form.addEventListener("submit", inputCity);

// geoloc data
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4cca19136987fd45a7562c340065ee08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&units=metric}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
function currLocSearch(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocButton = document.querySelector(".currLocBtn");
currLocBtn.addEventListener("click", currLocSearch);
