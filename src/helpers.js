import { 
  INTERVAL_BETWEEN_REQUESTS, 
  days, 
  weatherPriority, 
  weatherPriorityHash, 
  iconUrls, } from './constants';

export const shouldRequestWeather = weatherData => {
  if(!!weatherData) {
    const intervalBetweenRequests = (Date.now() - weatherData.latestRequestTimestamp); // in minutes
    if(intervalBetweenRequests >= INTERVAL_BETWEEN_REQUESTS) {
      return true;
    }
    return false;
  }
  return true;
}

const normalizeEachWeather = data => {
  return {
    date: new Date(data.dt_txt),
    temp: data.main.temp,
    minTemp: data.main.temp_min,
    maxTemp: data.main.temp_max,
    description: data.weather[0].description,
    wind: data.wind.speed,
    icon: data.weather[0].icon,
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
      prev.description = weatherPriority[
        Math.max(
          weatherPriorityHash[prev.description] || 0, 
          weatherPriorityHash[next.description] || 0
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