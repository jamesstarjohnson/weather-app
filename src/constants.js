import countriesList from './countries.json';
export const countries = countriesList;

export const UKRAINE_CITY = {
  city: 'Kiev',
  country: 'Ukraine',
  id: 703448,
}


export const INTERVAL_BETWEEN_REQUESTS = 30 * 60 * 1000; // 30 minutes in milliseconds
export const MONDAY = "MONDAY";
export const TUESDAY = "TUESDAY";
export const WEDNESDAY = "WEDNESDAY";
export const THURSDAY = "THURSDAY";
export const FRIDAY = "FRIDAY";
export const SATURDAY = "SATURDAY";
export const SUNDAY = "SUNDAY";
export const days = [
  SUNDAY,
  MONDAY, 
  TUESDAY, 
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
];

export const weatherPriority = {
  "clear sky": 0,
  "few clouds": 1,
  "overcast clouds": 2,
  "scattered clouds": 3,
  "broken clouds": 4,
  "shower rain": 5,
  "rain": 6,
  "thunderstorm": 7,
  "light snow": 8,
  "snow": 9,
  "mist": 10,
}

export const getUrl = icon => {
  return `http://openweathermap.org/img/w/${icon}.png`;
}

export const iconUrls = {
  "clear sky": getUrl('01d'),
  "few clouds": getUrl('02d'),
  "scattered clouds": getUrl('03d'),
  "broken clouds": getUrl('04d'),
  "overcast clouds": getUrl('04d'),
  "shower rain": getUrl('09d'),
  "rain": getUrl('10d'),
  "thunderstorm": getUrl('11d'),
  "light snow": getUrl('13d'),
  "snow": getUrl('13d'),
  "mist": getUrl('50d'),
}