const apiKey = "8c4febd32c6b1c91aee4fdb805d2b5ea";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".Weather-icon");

// Function to save the city name to local storage
function saveCityToLocalStorage(city) {
  localStorage.setItem("cityName", city);
}

// Function to retrieve the city name from local storage
function getCityFromLocalStorage() {
  return localStorage.getItem("cityName");
}

// Function to update the UI with weather data
async function updateWeatherUI(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".Weather").style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".Weather").style.display = "block";
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