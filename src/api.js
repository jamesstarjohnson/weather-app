import { ASC } from './constants';

const createUrl = () => {
  return 'http://api.openweathermap.org/data/2.5/forecast?id=703448&units=metric&APPID=da62c2775e1a94875c0f9ed7117cf768';
}

const fetchData = () => {
  return fetch(createUrl())
  .then((resp) => resp.json());
}

export default fetchData;