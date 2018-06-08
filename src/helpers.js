import { 
  INTERVAL_BETWEEN_REQUESTS, 
  days, 
  weatherPriority,
  getUrl,
  countries,
  iconUrls, } from './constants';

export const shouldRequestWeather = (weatherData, isCityChanged) => {
  if(isCityChanged) {
    return true;
  }
  if(!!weatherData) {
    const intervalBetweenRequests = (Date.now() - weatherData.latestRequestTimestamp); // in minutes
    if(intervalBetweenRequests >= INTERVAL_BETWEEN_REQUESTS) {
      return true;
    }
    return false;
  }
  return true;
}

export const getCountry = (countryKey) => {
  return countries[countryKey];
}

export const getCurrentDay = () => {
  return days[new Date().getDay()];
}

const normalizeEachWeather = data => {
  return {
    date: new Date(data.dt_txt),
    temp: Math.round(data.main.temp),
    minTemp: Math.round(data.main.temp_min),
    maxTemp: Math.round(data.main.temp_max),
    description: data.weather[0].description,
    iconUrl: getUrl(data.weather[0].icon),
    wind: data.wind.speed,
  }
}

export const convertToState = data => {
  let prevDay = undefined;
  return data.list.reduce((acc, n) => {
    const next = normalizeEachWeather(n);
    const day = days[next.date.getDay()];
    if(prevDay === day) {
      const prev = acc[prevDay];
      prev.list.push(next);
      prev.maxTemp = Math.round(Math.max(prev.maxTemp, next.maxTemp));
      prev.minTemp = Math.round(Math.min(prev.minTemp, next.minTemp));
      prev.description = Object.keys(weatherPriority)[
        Math.max(
          weatherPriority[prev.description] || 0, 
          weatherPriority[next.description] || 0
        )
      ];
      prev.iconUrl = iconUrls[prev.description];
    } else {
      acc[day] = { 
        list: [next], 
        maxTemp: Math.round(next.maxTemp),
        minTemp: Math.round(next.minTemp),
        description: next.description,
        iconUrl: iconUrls[next.description],
      };
      prevDay = day;
    }
    return acc;
  }, {});
}