const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=eae901dbc56cdaa4ad6c8cb80f8371c4";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value || "London";
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((res) => {
      const status = res.data.weather[0];

      if (status.id >= 200 && status.id < 300) {
        photo.setAttribute("src", "images/thunderstorm.png");
      } else if (status.id >= 300 && status.id < 400) {
        photo.setAttribute("src", "images/drizzle.png");
      } else if (status.id >= 500 && status.id < 600) {
        photo.setAttribute("src", "images/rain.png");
      } else if (status.id >= 600 && status.id < 700) {
        photo.setAttribute("src", "images/ice.png");
      } else if (status.id >= 700 && status.id < 800) {
        photo.setAttribute("src", "images/fog.png");
      } else if (status.id === 800) {
        photo.setAttribute("src", "images/sun.png");
      } else if (status.id > 800 && status.id < 900) {
        photo.setAttribute("src", "images/cloud.png");
      } else {
        photo.setAttribute("src", "images/unknown.png");
      }

      cityName.textContent = res.data.name;
      temperature.textContent = Math.floor(res.data.main.temp) + "°C";
      humidity.textContent = res.data.main.humidity + "%";
      weather.textContent = status.main;
      warning.textContent = "";
      input.value = "";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      warning.textContent =
        "Please enter the correct name of the city for which you want to check the weather!";
    });
};

const enterCheck = (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
};
input.addEventListener("keyup", enterCheck);
button.addEventListener("click", getWeather);
getWeather();
