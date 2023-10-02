const apiKey = "8c4febd32c6b1c91aee4fdb805d2b5ea";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q="; // Use "imperial" units for Fahrenheit

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const forecastList = document.querySelector(".forecast-list");

// Function to save the city name to local storage
function saveCityToLocalStorage(city) {
  localStorage.setItem("cityName", city);
}

// Function to retrieve the city name from local storage
function getCityFromLocalStorage() {
  return localStorage.getItem("cityName");
}

// Function to update the UI with weather data for the next 5 days
async function updateWeatherUI(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    forecastList.innerHTML = ""; // Clear the forecast list
  } else {
    let data = await response.json();

    // Update the current weather data
    document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + "°F";
    document.querySelector(".humidity").innerHTML = data.list[0].main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed + " mph";

    if (data.list[0].weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.list[0].weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.list[0].weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.list[0].weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.list[0].weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    // Update the forecast for the next 5 days
    forecastList.innerHTML = ""; // Clear the forecast list

    for (let i = 0; i < 5; i++) {
      const forecast = data.list[i];
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(forecast.main.temp) + "°F"; 
      const icon = forecast.weather[0].main.toLowerCase();

      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");
      forecastItem.innerHTML = `
        <div class="day">${day}</div>
        <img src="images/${icon}.png" alt="${forecast.weather[0].description}">
        <div class="temp">${temp}</div>
      `;
      forecastList.appendChild(forecastItem);
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  saveCityToLocalStorage(city); // Save the city to local storage
  updateWeatherUI(city); // Update the UI with weather data
});

// Retrieve and display the city name from local storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const storedCity = getCityFromLocalStorage();
  if (storedCity) {
    searchBox.value = storedCity;
    updateWeatherUI(storedCity); // Update the UI with weather data
  }
});