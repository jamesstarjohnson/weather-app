const createUrl = id => {
  return `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&APPID=da62c2775e1a94875c0f9ed7117cf768`;
}

const fetchData = (id) => {
  return fetch(createUrl(id))
  .then((resp) => resp.json());
}

export default fetchData;