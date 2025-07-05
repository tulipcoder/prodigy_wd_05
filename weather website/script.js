const apiKey = 'dcd99e9cacdb419997b41916250507'; 

function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  if (!location) {
    alert("Please enter a location");
    return;
  }

  const url = 'https://api.weatherapi.com/v1/forecast.json?key=dcd99e9cacdb419997b41916250507&q=${location}&days=3&aqi=yes&alerts=no';

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("HTTP error " + response.status);
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
      document.getElementById("currentWeather").innerHTML = "<p>Error loading data.</p>";
    });
}

function displayWeather(data) {
  const current = data.current;
  const forecast = data.forecast.forecastday;

  //  Current Weather
  document.getElementById("currentWeather").innerHTML = `
    <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
    <p><strong>Temperature:</strong> ${current.temp_c} °C / ${current.temp_f} °F</p>
    <p><strong>Condition:</strong> ${current.condition.text} <img src="${current.condition.icon}" /></p>
    <p><strong>Humidity:</strong> ${current.humidity}%</p>
    <p><strong>Wind:</strong> ${current.wind_kph} kph</p>
    <p><strong>Pressure:</strong> ${current.pressure_mb} mb</p>
    <p><strong>UV Index:</strong> ${current.uv}</p>
    <p><strong>Last Updated:</strong> ${current.last_updated}</p>
  `;

  // Hourly Forecast
  let hourlyHtml = "";
  forecast[0].hour.forEach(hour => {
    const time = hour.time.split(" ")[1];
    hourlyHtml += `
      <div>
        <p><strong>${time}</strong></p>
        <p>${hour.temp_c} °C</p>
        <img src="${hour.condition.icon}" alt="${hour.condition.text}" />
      </div>
    `;
  });
  document.getElementById("hourlyForecast").innerHTML = hourlyHtml;

  //  3-Day Forecast
  let dailyHtml = '';
  forecast.forEach(day => {
    dailyHtml += `
      <div class="forecast-day">
        <p><strong>${day.date}</strong></p>
        <p>${day.day.avgtemp_c} °C</p>
        <p>${day.day.condition.text} <img src="${day.day.condition.icon}" /></p>
      </div>
    `;
  });
  document.getElementById("dailyForecast").innerHTML = dailyHtml;

  //  Sunrise & Sunset
  let sunHtml = '';
  forecast.forEach(day => {
    sunHtml += `
      <div class="sun-times">
        <p><strong>${day.date}</strong></p>
        <p>Sunrise: ${day.astro.sunrise}</p>
        <p>Sunset: ${day.astro.sunset}</p>
      </div>
    `;
  });
  document.getElementById("sunTimes").innerHTML = sunHtml;
}