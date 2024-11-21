const apiKey = "41208b41b1c370bd802c768aa8221dce";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const widget = document.getElementById("weatherWidget");
const closeWidget = document.getElementById("closeWidget");

const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const place = document.getElementById("place");
const windSpeed = document.getElementById("windSpeed");
const date = document.getElementById("date");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value;

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.cod === 200) {
            weatherIcon.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`;
            temperature.textContent = `${Math.round(result.main.temp - 273.15)}°C`;
            weatherCondition.textContent = result.weather[0].main;
            place.textContent = result.name;
            windSpeed.textContent = `${result.wind.speed} M/H`;
            date.textContent = new Date(result.dt * 1000).toLocaleDateString();

            widget.style.display = "flex";
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
});

closeWidget.addEventListener("click", () => {
    widget.style.display = "none";
});
