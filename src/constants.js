export const DESC = "DESC";
export const ASC = "ASC";
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

export const weatherPriority = [
  "clear sky", "few clouds", "scattered clouds", "broken clouds", "shower rain", "rain", "thunderstorm", "snow", "mist"
];

export const weatherPriorityHash = {
  "clear sky": 0,
  "few clouds": 1,
  "scattered clouds": 2,
  "broken clouds": 3,
  "shower rain": 4,
  "rain": 5,
  "thunderstorm": 6,
  "snow": 7,
  "mist": 8,
}

export const iconUrls = {
  "clear sky": 'http://openweathermap.org/img/w/01d.png',
  "few clouds": 'http://openweathermap.org/img/w/02d.png',
  "scattered clouds": 'http://openweathermap.org/img/w/03d.png',
  "broken clouds": 'http://openweathermap.org/img/w/04d.png',
  "shower rain": 'http://openweathermap.org/img/w/09d.png',
  "rain": 'http://openweathermap.org/img/w/10d.png',
  "thunderstorm": 'http://openweathermap.org/img/w/11d.png',
  "snow": 'http://openweathermap.org/img/w/13d.png',
  "mist": 'http://openweathermap.org/img/w/50d.png',
}