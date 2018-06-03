export const loadPersistedWeather = () => {
  const weatherData = localStorage.getItem('weather_data');
  if(weatherData === null) {
    return undefined;
  }
  return JSON.parse(weatherData);
}

export const savePersistedWeather = data => {
  const weatherData = {
    data,
    latestRequestTimestamp: Date.now(),
  }
  localStorage.setItem('weather_data', JSON.stringify(weatherData));
}