const apiKey = '5131f785595a7dbb2e5f721c00417bf6';
const cityEl = document.querySelector('.city');
const temperatureEl = document.querySelector('.temperature');
const clearanceEl = document.querySelector('.clearance');

navigator.geolocation.getCurrentPosition(render, null, { enableHighAccuracy: true });

async function render(position) {
  let url = new URL('https://api.openweathermap.org/data/2.5/weather?');
  url.searchParams.set('lat', position.coords.latitude);
  url.searchParams.set('lon', position.coords.longitude);
  url.searchParams.set('units', 'metric');
  url.searchParams.set('lang', 'ru');
  url.searchParams.set('appid', apiKey);

  let responce = await fetch(url);
  let weatherData = await responce.json();

  cityEl.textContent = weatherData.name;
  temperatureEl.innerHTML = `${+weatherData.main.temp.toFixed()} <span>&deg;C</span>`;
  clearanceEl.src = `./images/weather-icons/${weatherData.weather[0].main.toLowerCase()}.png`;
}
