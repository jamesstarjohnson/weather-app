import { days } from './constants';
export const getWeatherList = state => {
  return days.map(item => {
    const value = state.weather.data[item];
    if(!value) {
      return undefined;
    }
    return {
      weekDay: item[0] + item.toLowerCase().slice(1, 3),
      ...value
    }
  }).filter(item => !!item);
}

export const currentWeather = state => {
  const currentDayId = new Date().getDay()
  const currentDayText = days[currentDayId];
  const weather = state.weather.data[currentDayText];
  const currentTimeStamp = Date.now();
  const currentItem = weather.list.map(item => {
    return {
      value: Math.abs(item.date.getTime() - currentTimeStamp),
      item,
    }
  }).reduce((acc, next) => {
    if(acc.value <= next.value) {
      return acc;
    } else {
      return next;
    }
  }, {value: 0, item: undefined});
  return {
    temp: currentItem.item.temp,
    icon: currentItem.item.icon,
    description: currentItem.item.description,
    wind: currentItem.item.wind,
  };
}