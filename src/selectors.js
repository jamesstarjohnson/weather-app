import { days, iconUrls } from './constants';

const getForcastDays = () => {
  let today = new Date();
  const allDays = [1,2,3,4,5].map(() => {
    const day = today.getDay();
    today = new Date(today.setHours(24)); // getting the following day
    return days[day];
  });
  return allDays;
}

export const getWeatherList = state => {
  return getForcastDays().map(item => {
    const value = state.weather.data[item];
    if(!value) {
      return undefined;
    }
    return {
      weekDay: item[0] + item.toLowerCase().slice(1, 3),
      weekDayTextId: item,
      ...value
    }
  }).filter(item => !!item);
}

export const getCurrentDayWeatherList = state => {
  const weather = state.weather.data[state.dayInfo.weekDayTextId];
  return! weather ? [] : weather.list.map(item => {
    return {
      time: new Date(item.date).getHours(),
      temp: item.temp,
    }
  })
}

export const getCurrentWeather = state => {
  const currentDayId = new Date().getDay()
  const currentDayText = days[currentDayId];
  const weather = state.weather.data[currentDayText];
  const currentTimeStamp = Date.now();
  const currentItem = weather && weather.list.map(item => {
    return {
      value: Math.abs(new Date(item.date).getTime() - currentTimeStamp),
      item,
    }
  }).reduce((acc, next) => {
    if(acc.value <= next.value) {
      return acc;
    } else {
      return next;
    }
  }, {value: Infinity, item: undefined});
  return !currentItem ? {} : {
    temp: Math.round(currentItem.item.temp),
    icon: iconUrls[currentItem.item.description],
    description: currentItem.item.description,
  };
}