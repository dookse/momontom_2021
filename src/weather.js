const WEATHER_LS = 'weather';
const API_KEYS = 'c8cb2744878110cb330440de4bdc1e96';
const weatherSpan = document.querySelector('.js-weather');

const getWeather = (lat, lon) => {
  fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`)
  .then(response => response.json())
  .then(json => {
    weatherSpan.innerText = `${json.main.temp} @${json.name}`;
  });
};

const success = ({coords}) => {
  const coordsObj = {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
  saveCoords(coordsObj);
  getWeather(coordsObj.latitude, coordsObj.longitude);
};

const saveCoords = coords => localStorage.setItem(WEATHER_LS,
    JSON.stringify(coords));

const loadCoords = () => navigator.geolocation.getCurrentPosition(success,
    () => console.error('Geolocation error'));

const weather = {
  init: () => {
    const loaded = localStorage.getItem(WEATHER_LS);
    if (loaded === null) {
      loadCoords();
    } else {
      const parsed = JSON.parse(loaded);
      getWeather(parsed.latitude, parsed.longitude);
    }
  }
}
weather.init();
